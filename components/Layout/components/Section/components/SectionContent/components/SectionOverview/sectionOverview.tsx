import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { TEXT_HEADING } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Divider } from "@mui/material";
import { Fragment } from "react";
import { Heading } from "../../../../../../../common/Typography/components/Heading/heading";
import { GroupOverview, StyledList } from "./sectionOverview.styles";
import { Props } from "./types";

const MAX_ROWS = 4;

export const SectionOverview = ({ overview }: Props): JSX.Element | null => {
  if (!overview) return null;
  return (
    <Fragment>
      {overview.map(({ label, links }, i) => {
        return (
          links.length > 0 && (
            <GroupOverview key={i}>
              {i > 0 && <Divider />}
              <Heading
                component="h2"
                headingValue={label}
                variant={TEXT_HEADING}
              />
              <StyledList nth={Math.max(MAX_ROWS, links.length / 2)}>
                {links.map((linkProps, i) => (
                  <li key={i}>
                    <Link {...linkProps} />
                  </li>
                ))}
              </StyledList>
            </GroupOverview>
          )
        );
      })}
    </Fragment>
  );
};
