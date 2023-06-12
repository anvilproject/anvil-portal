import { Accordion } from "@clevercanary/data-explorer-ui/lib/components/common/Accordion/accordion";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
import { TEXT_BODY_LARGE_500 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import {
  getOrganizedCategoryMaterials,
  MaterialsCategory,
} from "../common/materials";
import { MaterialsList as MList } from "./materialsList.styles";

interface MaterialsListProps {
  category: MaterialsCategory;
  children?: ReactNode;
  className?: string;
}

export const MaterialsList = ({
  category,
  children,
  className,
}: MaterialsListProps): JSX.Element => {
  return (
    <MList className={className}>
      {getOrganizedCategoryMaterials(category).map((majorSection) => (
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
                      url={file.url}
                      target={ANCHOR_TARGET.BLANK}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Accordion>
      ))}
      {children}
    </MList>
  );
};
