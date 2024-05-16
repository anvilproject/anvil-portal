import { Accordion } from "@databiosphere/findable-ui/lib/components/common/Accordion/accordion";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { TEXT_BODY_LARGE_500 } from "@databiosphere/findable-ui/lib/theme/common/typography";
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
  firstExpanded?: boolean;
}

export const MaterialsList = ({
  category,
  children,
  className,
  firstExpanded = true,
}: MaterialsListProps): JSX.Element => {
  return (
    <MList className={className}>
      {getOrganizedCategoryMaterials(category).map((majorSection, i) => (
        <Accordion
          key={majorSection.label}
          expanded={firstExpanded && i === 0}
          title={majorSection.label}
        >
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
