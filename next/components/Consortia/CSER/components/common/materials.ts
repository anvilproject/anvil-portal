import materialsInfo from "./materialsInfo.json";

export enum MaterialsCategory {
  RESEARCH_MATERIALS = "RESEARCH_MATERIALS",
  RESOURCES = "RESOURCES",
}

export type MaterialsInfo = Record<string, MaterialsMajorSectionInfo>;

export interface MaterialsMajorSectionInfo {
  sections: Record<string, MaterialsMinorSectionInfo>;
}

export interface MaterialsMinorSectionInfo {
  files: Record<string, MaterialsFileInfo>;
}

interface MaterialsFileInfo {
  category: MaterialsCategory;
  fileName: string;
}

export interface MaterialsMajorSection {
  label: string;
  sections: MaterialsMinorSection[];
}

export interface MaterialsMinorSection {
  files: MaterialsFile[];
  label: string;
}

export interface MaterialsFile {
  label: string;
  name: string;
  url: string;
}

const categoryFileUrlPrefixes = {
  [MaterialsCategory.RESEARCH_MATERIALS]: "/consortia/cser/research-materials/",
  [MaterialsCategory.RESOURCES]: "/consortia/cser/resources/",
};

export function getOrganizedCategoryMaterials(
  category: MaterialsCategory
): MaterialsMajorSection[] {
  const { compare } = new Intl.Collator("en");
  const majorSections: MaterialsMajorSection[] = [];

  function getSortedEntries<T>(obj: Record<string, T>): [string, T][] {
    return Object.entries(obj).sort((a, b) => compare(a[0], b[0]));
  }

  for (const [majorSectionLabel, majorSectionInfo] of getSortedEntries(
    materialsInfo as MaterialsInfo
  )) {
    const minorSections: MaterialsMinorSection[] = [];
    for (const [minorSectionLabel, minorSectionInfo] of getSortedEntries(
      majorSectionInfo.sections
    )) {
      const files: MaterialsFile[] = [];
      for (const [fileLabel, fileInfo] of getSortedEntries(
        minorSectionInfo.files
      )) {
        if (fileInfo.category === category) {
          files.push({
            label: fileLabel,
            name: fileInfo.fileName,
            url:
              categoryFileUrlPrefixes[category] +
              encodeURIComponent(fileInfo.fileName),
          });
        }
      }
      if (files.length)
        minorSections.push({
          files: files,
          label: minorSectionLabel,
        });
    }
    if (minorSections.length)
      majorSections.push({
        label: majorSectionLabel,
        sections: minorSections,
      });
  }

  return majorSections;
}
