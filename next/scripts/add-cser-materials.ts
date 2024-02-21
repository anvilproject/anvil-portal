import { promises as fsp } from "fs";
import path from "path";
import {
  MaterialsCategory,
  MaterialsInfo,
  MaterialsMajorSectionInfo,
} from "../components/Consortia/CSER/components/common/materials";

/**
 * Updates CSER materials with new materials from scripts/new-cser-materials
 * new-cser-materials is expected to contain a resources.json or research-materials.json,
 * listing file names under object peroperty paths of the form [arbitrary key] > [major section title] > [minor section title] > [file title]
 * It's also expected to contain folders corrosponding to the major sections, containing folders for the minor sections, contining files;
 * all of them named with their titles, with certain characters (apostrophe) replaced with underscore
 * Files in an existing major section with a uniform category are given that category rather than the one associated with the JSON file
 * Files at title paths that already exist are skipped
 */

type MaterialsAdditions = Record<string, MaterialsAdditionsInfo>;
type MaterialsAdditionsInfo = Record<string, MaterialsAdditionsMajorSection>;
type MaterialsAdditionsMajorSection = Record<string, Record<string, string>>;

const newMaterialsPath = "./scripts/new-cser-materials";
const materialsInfoPath =
  "./components/Consortia/CSER/components/common/materialsInfo.json";
const cserFilesPath = "./public/consortia/cser";
const materialsCategoryNames = {
  [MaterialsCategory.RESOURCES]: "resources",
  [MaterialsCategory.RESEARCH_MATERIALS]: "research-materials",
};

addMaterials();

async function addMaterials(): Promise<void> {
  const materialsInfo = JSON.parse(
    await fsp.readFile(materialsInfoPath, "utf8")
  ) as MaterialsInfo;
  let didAddMaterials = false;
  for (const additionsCategory of Object.values(MaterialsCategory)) {
    const categoryName = materialsCategoryNames[additionsCategory];
    let jsonText;
    try {
      jsonText = await fsp.readFile(
        path.resolve(newMaterialsPath, `${categoryName}.json`),
        "utf8"
      );
    } catch (e) {
      continue;
    }
    const newMaterialsInfo = JSON.parse(jsonText) as MaterialsAdditions;
    console.log(`Adding ${categoryName}`);
    await addCategoryAdditions(
      newMaterialsInfo,
      materialsInfo,
      additionsCategory
    );
    didAddMaterials = true;
  }
  if (didAddMaterials) {
    await fsp.writeFile(
      materialsInfoPath,
      JSON.stringify(materialsInfo, undefined, 2) + "\n"
    );
    console.log(`Wrote to ${materialsInfoPath}`);
  } else console.log("No JSONs found");
}

async function addCategoryAdditions(
  newMaterialsInfo: MaterialsAdditions,
  materialsInfo: MaterialsInfo,
  additionsCategory: MaterialsCategory
): Promise<void> {
  for (const additions of Object.values(newMaterialsInfo)) {
    for (const [majorSectionTitle, majorSectionAdditions] of Object.entries(
      additions
    )) {
      const majorSection =
        materialsInfo[majorSectionTitle] ||
        (materialsInfo[majorSectionTitle] = {});
      const inferredCategory = getMajorSectionCategory(majorSection);
      let category = additionsCategory;
      if (inferredCategory && inferredCategory !== additionsCategory) {
        console.log(
          `Changing category to ${inferredCategory} for additions to ${majorSectionTitle}`
        );
        category = inferredCategory;
      }
      await addMajorSection(
        majorSectionAdditions,
        majorSection,
        category,
        path.resolve(newMaterialsPath, normalizeFileName(majorSectionTitle)),
        path.resolve(cserFilesPath, materialsCategoryNames[category])
      );
    }
  }
}

async function addMajorSection(
  majorSectionAdditions: MaterialsAdditionsMajorSection,
  majorSection: MaterialsMajorSectionInfo,
  category: MaterialsCategory,
  newFilesPath: string,
  filesPath: string
): Promise<void> {
  for (const [minorSectionTitle, minorSectionAdditions] of Object.entries(
    majorSectionAdditions
  )) {
    const minorSection =
      majorSection[minorSectionTitle] || (majorSection[minorSectionTitle] = {});
    for (const [fileTitle, fileName] of Object.entries(minorSectionAdditions)) {
      if (minorSection[fileTitle]) {
        console.log(`Skipping existing file ${fileTitle}`);
        continue;
      }
      minorSection[fileTitle] = {
        category,
        fileName,
      };
      const fileExtension = /(?:\.[^.]+)?$/.exec(fileName)?.[0];
      await copyNewFile(
        path.resolve(
          newFilesPath,
          normalizeFileName(minorSectionTitle),
          `${normalizeFileName(fileTitle)}${fileExtension}`
        ),
        path.resolve(filesPath, fileName)
      );
    }
  }

  async function copyNewFile(
    newFilePath: string,
    targetPath: string
  ): Promise<void> {
    await confirmPathAncestor(newFilePath, newMaterialsPath);
    await confirmPathAncestor(targetPath, cserFilesPath);
    let exists = true;
    try {
      await fsp.access(targetPath);
    } catch (e) {
      exists = false;
    }
    if (exists) console.log(`Overwriting existing ${targetPath}`);
    await fsp.copyFile(newFilePath, targetPath);
  }

  async function confirmPathAncestor(
    checkPath: string,
    ancestorPath: string
  ): Promise<void> {
    if (
      !path
        .resolve(checkPath)
        .startsWith(`${path.resolve(ancestorPath)}${path.sep}`)
    )
      throw new Error(`Path has wrong ancestor: ${JSON.stringify(checkPath)}`);
  }
}

function getMajorSectionCategory(
  majorSection: MaterialsMajorSectionInfo
): MaterialsCategory | null {
  let category: MaterialsCategory | null = null;
  for (const minorSection of Object.values(majorSection)) {
    for (const file of Object.values(minorSection)) {
      if (category) {
        if (file.category !== category) return null;
      } else {
        category = file.category;
      }
    }
  }
  return category;
}

function normalizeFileName(name: string): string {
  return name.replace(/'/g, "_");
}
