import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { Divider } from "@mui/material";
import { Fragment, JSX } from "react";
import { Heading } from "../../../../../../../common/Typography/components/Heading/heading";
import {
  GroupOverview,
  GroupLinks,
  UnorderedList,
} from "./sectionOverview.styles";
import { SectionOverviewProps } from "./types";
import { splitLinks } from "./utils";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const SectionOverview = ({
  overview,
}: SectionOverviewProps): JSX.Element | null => {
  if (!overview) return null;
  return (
    <Fragment>
      {overview.map(({ label, links }, groupIndex) => {
        return (
          links.length > 0 && (
            <GroupOverview key={groupIndex}>
              {groupIndex > 0 && <Divider />}
              <Heading
                component="h2"
                headingValue={label}
                variant={TYPOGRAPHY_PROPS.VARIANT.HEADING}
              />
              <GroupLinks>
                {splitLinks(links).map(
                  (links, linksIndex) =>
                    links.length > 0 && (
                      <UnorderedList key={linksIndex}>
                        {links.map((linkProps, listIndex) => (
                          <li key={listIndex}>
                            <Link {...linkProps} />
                          </li>
                        ))}
                      </UnorderedList>
                    )
                )}
              </GroupLinks>
            </GroupOverview>
          )
        );
      })}
    </Fragment>
  );
};
