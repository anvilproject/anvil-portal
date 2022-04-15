const path = require("path");
const fsPromises = require("fs/promises");
const { promisify } = require("util");
const parseCsv = promisify(require("csv-parse").parse);

const workspaceFilesPath = "./workspace-files";
const workspacesInfoPath = "../plugins/utils/dashboard-source-anvil.tsv";
const outPath = "../src/components/data-ingestion-chart/chart-data.ts";

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
	let minDateNum = Infinity;
	let maxDateNum = -Infinity;
	
	for (let ws of workspaces) {
		if (workspaceFileNames.includes(ws.name)) {
			const entries = await getWorkspaceEntries(ws.name);
			const arr = (entriesByConsortium[ws.consortium] || (entriesByConsortium[ws.consortium] = []));
			entries.forEach(e => {
				arr.push(e);
				const dateNum = new Date(e.date).getTime();
				if (dateNum < minDateNum) minDateNum = dateNum;
				if (dateNum > maxDateNum) maxDateNum = dateNum;
			});
		} else {
			console.log("Missing: " + ws.name);
		}
	}
	
	const minDate = new Date(minDateNum);
	const startYear = minDate.getFullYear();
	const startMonth = minDate.getMonth();
	const numMonths = dateToIndex(maxDateNum) + 1;
	const monthDataByConsortium = Object.entries(entriesByConsortium).map(([consortium, entries]) => {
		const addedSizes = Array(startMonth + 1 + numMonths).fill(0); // that +1 is to get the labels aligned
		
		for (let e of entries) {
			addedSizes[dateToIndex(e.date) + startMonth + 1] += parseFloat(e.size); // that one too
		}
		
		return [consortium, addedSizes];
	});
	
	const scriptText = `export const startYear = ${JSON.stringify(startYear)}; export const monthDataByConsortium: Array<[string, Array<number>]> = ${JSON.stringify(monthDataByConsortium)};`;
	
	await fsPromises.writeFile(outPath, scriptText);
	
	return true;
	
	
	function dateToIndex(dateSrc) {
		let date = new Date(dateSrc);
		return (date.getFullYear() - startYear) * 12 - startMonth + date.getMonth();
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