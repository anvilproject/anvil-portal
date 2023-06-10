import { Accordion } from "@clevercanary/data-explorer-ui/lib/components/common/Accordion/accordion";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { TEXT_BODY_LARGE_500 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { ResearchMaterials as RMaterials } from "./researchMaterials.styles";
import {
  MaterialsCategory,
  getOrganizedCategoryMaterials,
} from "../common/materials";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";

const fileUrlPrefix = "/consortia/cser/research-materials/";

export const ResearchMaterials = (): JSX.Element => {
  return (
    <RMaterials>
      {getOrganizedCategoryMaterials(MaterialsCategory.RESEARCH_MATERIALS).map(
        (majorSection) => (
          <Accordion key={majorSection.label} title={majorSection.label}>
            {majorSection.sections.map((minorSection) => (
              <div key={minorSection.label}>
                <Typography component="div" variant={TEXT_BODY_LARGE_500}>
                  {minorSection.label}
                </Typography>
                <ul>
                  {minorSection.files.map((file) => (
                    <li key={file.label}>
                      <Link
                        label={file.label}
                        url={fileUrlPrefix + file.name}
                        target={ANCHOR_TARGET.BLANK}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Accordion>
        )
      )}
    </RMaterials>
  );
};
