import { parse as callbackParseCsv } from "csv-parse";
import { promises as fsPromises } from "fs";
import path from "path";
import { promisify } from "util";

const parseCsv = promisify(callbackParseCsv);

const chartDataPath =
  "../components/Consortia/CSER/components/DataIngestionChart/chart-data.json";
const workspaceFilesPath = "./workspace-files";
const workspacesInfoPath = "./files/dashboard-source-anvil_2023-03-27.tsv";

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

  const entriesByConsortium = {};
  let maxDateNum = -Infinity;

  for (let ws of workspaces) {
    if (workspaceFileNames.includes(ws.name)) {
      const entries = await getWorkspaceEntries(ws.name);
      const arr =
        entriesByConsortium[ws.consortium] ||
        (entriesByConsortium[ws.consortium] = []);
      entries.forEach((e) => {
        let dateNum = new Date(e.date).getTime();
        if (dateNum < newDataMinTime) {
          dateNum = newDataMinTime; // shift new data to after the old data, so it can cancel out without changing the chart history
          e = Object.assign({}, e, { date: new Date(dateNum).toISOString() });
        }
        arr.push(e);
        if (dateNum > maxDateNum) maxDateNum = dateNum;
      });
    } else {
      console.log("No file for " + ws.name);
    }
  }

  const numMonths = dateToIndex(maxDateNum) + 1;
  const oldDataEndIndex = oldMonthData[0][1].length - 1;
  const newDataStartIndex = dateToIndex(newDataMinTime);
  const minNewStartVals = {};

  const monthDataObj = Object.fromEntries(
    oldMonthData.map(([consortium, addedSizes]) => {
      const newAddedSizes = addedSizes.concat(
        Array(numMonths - addedSizes.length).fill(0)
      );
      minNewStartVals[consortium] = newAddedSizes[newDataStartIndex];
      newAddedSizes[newDataStartIndex] -= addedSizes.reduce((a, b) => a + b); // cancel out duplicate info from the new data
      return [consortium, newAddedSizes];
    })
  );

  Object.entries(entriesByConsortium).forEach(([consortium, entries]) => {
    const addedSizes =
      monthDataObj[consortium] ||
      (monthDataObj[consortium] = Array(numMonths).fill(0));

    for (let e of entries) {
      addedSizes[dateToIndex(e.date)] += parseFloat(e.size);
    }
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
