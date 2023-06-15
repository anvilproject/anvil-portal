import fsp from "fs/promises";
import path from "path";
import got from "got";

const urlsJsonPath = "./files/cser-materials-urls.json";
const cserDirPath = "../public/consortia/cser";

const categoryDirNames = {
    "research-material": "research-materials",
    attachments: "resources",
};

getMaterials();

async function getMaterials() {
  // Create category directories
  for (const dirName of Object.values(categoryDirNames)) {
    const dirPath = path.resolve(cserDirPath, dirName);
    try {
      await fsp.access(dirPath);
    } catch(e) {
      await fsp.mkdir(dirPath);
    }
  }
  // Download files
  const materialsUrls = JSON.parse(await fsp.readFile(urlsJsonPath, "utf8"));
  for (const url of iterFlatObjectValues(materialsUrls)) {
    const urlMatch = /\/(research-material|attachments)\/([^\/]+)$/.exec(url);
    if (!urlMatch) {
      console.log(`Unknown path format for ${JSON.stringify(url)}`);
      continue;
    }
    const dirName = categoryDirNames[urlMatch[1]];
    const fileName = urlMatch[2];
    console.log(`Getting ${fileName}`);
    await fsp.writeFile(path.resolve(cserDirPath, dirName, fileName), got.stream(url));
  }
  console.log("Done");
}

function* iterFlatObjectValues(obj) {
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      yield* iterFlatObjectValues(value);
    } else {
      yield value;
    }
  }
}
