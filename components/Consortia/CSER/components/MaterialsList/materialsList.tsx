import { Accordion } from "@databiosphere/findable-ui/lib/components/common/Accordion/accordion";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { Typography } from "@mui/material";
import { JSX, ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
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
              <Typography
                component="div"
                variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}
              >
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
