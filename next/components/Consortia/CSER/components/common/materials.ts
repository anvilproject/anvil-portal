import materialsInfo from "./materialsInfo.json";

export enum MaterialsCategory {
  RESEARCH_MATERIALS = "RESEARCH_MATERIALS",
  RESOURCES = "RESOURCES",
}

export type MaterialsInfo = Record<string, MaterialsMajorSectionInfo>;

export interface MaterialsMajorSectionInfo {
  sections: Record<string, MaterialsMinorSectionInfo>;
  sortOrder?: number;
}

export interface MaterialsMinorSectionInfo {
  files: Record<string, MaterialsFileInfo>;
  sortOrder?: number;
}

interface MaterialsFileInfo {
  category: MaterialsCategory;
  fileName: string;
  sortOrder?: number;
}

interface MaterialsSortable {
  sortOrder?: number;
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

const { compare: compareAlphabetical } = new Intl.Collator("en");

export function getOrganizedCategoryMaterials(
  category: MaterialsCategory
): MaterialsMajorSection[] {
  const majorSections: MaterialsMajorSection[] = [];

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

function getSortedEntries<T extends MaterialsSortable>(
  obj: Record<string, T>
): [string, T][] {
  return Object.entries(obj).sort((a, b) => {
    const primaryOrder = (a[1].sortOrder || 0) - (b[1].sortOrder || 0);
    return primaryOrder || compareAlphabetical(a[0], b[0]);
  });
}
