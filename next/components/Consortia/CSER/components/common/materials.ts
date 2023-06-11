import materialsInfo from "./materialsInfo.json";

export enum MaterialsCategory {
  RESEARCH_MATERIALS = "RESEARCH_MATERIALS",
  RESOURCES = "RESOURCES",
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

const categoryRegExps = {
  [MaterialsCategory.RESEARCH_MATERIALS]: /\/research-material\/([^\/]+)$/,
  [MaterialsCategory.RESOURCES]: /\/attachments\/([^\/]+)$/,
};

export function getOrganizedCategoryMaterials(category: MaterialsCategory) {
  const regExp = categoryRegExps[category];
  const { compare } = new Intl.Collator("en");
  const majorSections: MaterialsMajorSection[] = [];

  function getSortedEntries(obj: object) {
    return Object.entries(obj).sort((a, b) => compare(a[0], b[0]));
  }

  for (const [majorSectionLabel, majorSectionInfo] of getSortedEntries(
    materialsInfo
  )) {
    const minorSections: MaterialsMinorSection[] = [];
    for (const [minorSectionLabel, minorSectionInfo] of getSortedEntries(
      majorSectionInfo
    )) {
      const files: MaterialsFile[] = [];
      for (const [fileLabel, filePath] of getSortedEntries(minorSectionInfo)) {
        const match = regExp.exec(filePath);
        if (match) {
          files.push({
            label: fileLabel,
            name: match[1],
            url: categoryFileUrlPrefixes[category] + match[1],
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
        sections: minorSections,
        label: majorSectionLabel,
      });
  }

  return majorSections;
}
