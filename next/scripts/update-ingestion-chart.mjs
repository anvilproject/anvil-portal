import { parse as callbackParseCsv } from "csv-parse";
import { promises as fsPromises } from "fs";
import path from "path";
import { promisify } from "util";

const parseCsv = promisify(callbackParseCsv);

const chartDataPath =
  "../components/Consortia/CSER/components/DataIngestionChart/chart-data.json";
const workspaceFilesPath = "./workspace-files";
const workspacesInfoPath = "./files/dashboard-source-anvil.tsv";

generateChartData()
  .then((success) => {
    if (success) console.log("Done");
  })
  .catch((e) => {
    throw e;
  });

// eslint-disable-next-line sonarjs/cognitive-complexity -- TODO?
async function generateChartData() {
  const {
    endDateNum: oldEndDateNum,
    monthDataByConsortium: oldMonthData,
    startYear,
  } = JSON.parse(await fsPromises.readFile(chartDataPath, "utf8"));

  const newDataMinTime = oldEndDateNum + 1;

  try {
    await fsPromises.access(workspaceFilesPath);
  } catch (e) {
    console.log(
      "Folder /scripts/" +
        workspaceFilesPath.replace(/^.\//, "") +
        " needs to be added"
    );
    return false;
  }

  const workspaces = await getWorkspaces();
  const workspaceFileNames = await getWorkspaceFileNames();

  const monthDataObj = {};
  let maxDateNum = -Infinity;

  for (let [i, ws] of workspaces.entries()) {
    console.log(`(${i + 1}/${workspaces.length}) Processing ${ws.name}`);
    if (workspaceFileNames.includes(ws.name)) {
      const entries = await getWorkspaceEntries(ws.name);
      const addedSizes =
        monthDataObj[ws.consortium] || (monthDataObj[ws.consortium] = []);
      entries.forEach((e) => {
        let dateNum = new Date(e.date).getTime();
        if (dateNum < newDataMinTime) {
          dateNum = newDataMinTime; // shift new data to after the old data, so it can cancel out without changing the chart history
        }
        const index = dateToIndex(dateNum);
        addedSizes[index] = (addedSizes[index] || 0) + parseFloat(e.size);
        if (dateNum > maxDateNum) maxDateNum = dateNum;
      });
    } else {
      console.log("No file for " + ws.name);
    }
  }

  const numMonths = dateToIndex(maxDateNum) + 1;

  for (const addedSizes of Object.values(monthDataObj)) {
    for (let i = 0; i < numMonths; i++) {
      if (addedSizes[i] === undefined) addedSizes[i] = 0;
    }
  }

  const oldDataEndIndex = oldMonthData[0][1].length - 1;
  const newDataStartIndex = dateToIndex(newDataMinTime);
  const minNewStartVals = {};

  oldMonthData.forEach(([consortium, oldAddedSizes]) => {
    const addedSizes =
      monthDataObj[consortium] ||
      (monthDataObj[consortium] = new Array(numMonths).fill(0));
    for (const [i, size] of oldAddedSizes.entries()) {
      addedSizes[i] += size;
    }
    minNewStartVals[consortium] = oldAddedSizes[newDataStartIndex] || 0;
    addedSizes[newDataStartIndex] -= oldAddedSizes.reduce((a, b) => a + b); // cancel out duplicate info from the new data
  });

  for (const [consortium, addedSizes] of Object.entries(monthDataObj)) {
    const diff = minNewStartVals[consortium] - addedSizes[newDataStartIndex];
    if (diff > 0) {
      // value from new data is too small; try to avoid having the graph go downward
      const sumAfter = addedSizes
        .slice(newDataStartIndex + 1)
        .reduce((a, b) => a + b, 0);
      if (sumAfter >= diff) {
        // if the subsequent data eventually makes up the difference, distribute the negative change across the data
        addedSizes[newDataStartIndex] += diff;
        const scale = (sumAfter - diff) / sumAfter;
        for (let i = newDataStartIndex + 1; i < addedSizes.length; i++) {
          addedSizes[i] *= scale;
        }
      } else if (
        newDataStartIndex === oldDataEndIndex &&
        newDataStartIndex + 1 < addedSizes.length
      ) {
        // if a negative can't be avoided, try to avoid having the final month of the previous version of the graph be lower than it was
        addedSizes[newDataStartIndex] += diff;
        addedSizes[newDataStartIndex + 1] -= diff;
      }
    }
  }

  const monthDataByConsortium = Object.entries(monthDataObj);

  const jsonText = JSON.stringify({
    endDateNum: maxDateNum,
    monthDataByConsortium: monthDataByConsortium,
    startYear: startYear,
  });

  await fsPromises.writeFile(chartDataPath, jsonText);

  console.log("Added new data");

  return true;

  function dateToIndex(dateSrc) {
    let date = new Date(dateSrc);
    return (date.getFullYear() - startYear) * 12 + date.getMonth() + 1; // that +1 is to get the labels aligned
  }
}

async function getWorkspaces() {
  let [fields, ...data] = await parseCsv(
    await fsPromises.readFile(workspacesInfoPath, "utf8"),
    { delimiter: "\t", ltrim: true }
  );
  return data.map((items) =>
    Object.fromEntries(fields.map((name, i) => [name, items[i]]))
  );
}

async function getWorkspaceFileNames() {
  return (await fsPromises.readdir(workspaceFilesPath)).map((n) =>
    n.replace(/\.csv$/i, "")
  );
}

async function getWorkspaceEntries(name) {
  let arr = await parseCsv(
    await fsPromises.readFile(
      path.resolve(workspaceFilesPath, name + ".csv"),
      "utf8"
    )
  );
  if (arr[arr.length - 1][1] === "TOTAL:") arr.pop();
  return arr.map(([date, size]) => ({ date, size: size / 1e12 }));
}
