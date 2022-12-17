const path = require("path");
const fsPromises = require("fs/promises");
const { promisify } = require("util");
const parseCsv = promisify(require("csv-parse").parse);
const { startYear, monthDataByConsortium: oldMonthData} = require("./chart-data-2022-05.js");

const workspaceFilesPath = "./workspace-files";
const workspacesInfoPath = "../plugins/utils/dashboard-source-anvil.tsv";
const outPath = "../src/components/data-ingestion-chart/chart-data.ts";
const newDataMinTime = new Date(2022, 7, 26).getTime();

generateChartData().then(success => {
	if (success) console.log("Done");
}).catch(e => {
	throw e;
});

async function generateChartData() {
	try {
		await fsPromises.access(workspaceFilesPath);
	} catch(e) {
		console.log("Folder /scripts/" + workspaceFilesPath.replace(/^.\//, "") + " needs to be added");
		return false;
	}
	
	const workspaces = await getWorkspaces();
	const workspaceFileNames = await getWorkspaceFileNames();
	
	const entriesByConsortium = {};
	let maxDateNum = -Infinity;
	
	for (let ws of workspaces) {
		if (workspaceFileNames.includes(ws.name)) {
			const entries = await getWorkspaceEntries(ws.name);
			const arr = (entriesByConsortium[ws.consortium] || (entriesByConsortium[ws.consortium] = []));
			entries.forEach(e => {
				let dateNum = new Date(e.date).getTime();
				if (dateNum < newDataMinTime) {
					dateNum = newDataMinTime;
					e = Object.assign({}, e, {date: new Date(dateNum).toISOString()});
				}
				arr.push(e);
				if (dateNum > maxDateNum) maxDateNum = dateNum;
			});
		} else {
			console.log("Missing: " + ws.name);
		}
	}
	
	const numMonths = dateToIndex(maxDateNum) + 1;
	const newDataStartIndex = dateToIndex(newDataMinTime);
	const monthDataObj = Object.fromEntries(oldMonthData.map(([consortium, addedSizes]) => {
		const newAddedSizes = addedSizes.concat(Array(numMonths - addedSizes.length).fill(0));
		newAddedSizes[newDataStartIndex] = -addedSizes.reduce((a, b) => a + b); // cancel out duplicate info from the new data
		return [consortium, newAddedSizes];
	}));
	
	Object.entries(entriesByConsortium).forEach(([consortium, entries]) => {
		const addedSizes = monthDataObj[consortium] || (monthDataObj[consortium] = Array(numMonths).fill(0));
		
		for (let e of entries) {
			addedSizes[dateToIndex(e.date)] += parseFloat(e.size);
		}
	});
	
	const monthDataByConsortium = Object.entries(monthDataObj).map(([consortium, addedSizes]) => {
		console.log("Change with new data for " + consortium + ": " + addedSizes[newDataStartIndex] + " TB");
		return [consortium, addedSizes];
	});
	
	const scriptText = `export const startYear = ${JSON.stringify(startYear)}; export const newDataStartIndex = ${JSON.stringify(newDataStartIndex)}; export const monthDataByConsortium: Array<[string, Array<number>]> = ${JSON.stringify(monthDataByConsortium)};`;
	
	await fsPromises.writeFile(outPath, scriptText);
	
	return true;
	
	
	function dateToIndex(dateSrc) {
		let date = new Date(dateSrc);
		return (date.getFullYear() - startYear) * 12 + date.getMonth() + 1; // that +1 is to get the labels aligned
	}
}

async function getWorkspaces() {
	let [fields, ...data] = await parseCsv(await fsPromises.readFile(workspacesInfoPath, "utf8"), {delimiter: "\t", ltrim: true});
	return data.map(items => Object.fromEntries(fields.map((name, i) => [name, items[i]])));
}

async function getWorkspaceFileNames() {
	return (await fsPromises.readdir(workspaceFilesPath)).map(n => n.replace(/\.csv$/i, ""));
}

async function getWorkspaceEntries(name) {
	let arr = await parseCsv(await fsPromises.readFile(path.resolve(workspaceFilesPath, name + ".csv"), "utf8"));
	if (arr[arr.length - 1][1] === "TOTAL:") arr.pop();
	return arr.map(([date, size]) => ({date, size: size/1e12}));
}