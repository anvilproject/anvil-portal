import { Fragment } from "react";
import { StyledCard } from "./releasesView.styles";
import { SectionHero } from "../../components/Layout/components/Section/components/SectionHero/sectionHero";
import { SectionContent } from "../../components/Layout/components/Section/components/SectionContent/sectionContent";
import { PageProps } from "../../pages/data-releases/index";
import { Stack, Typography } from "@mui/material";
import { CardActionArea } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardActionArea/cardActionArea";
import { CardSecondaryText } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardSecondaryText/cardSecondaryText";
import { CardTitle } from "@databiosphere/findable-ui/lib/components/common/Card/components/CardTitle/cardTitle";
import { ForwardArrowIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/ForwardArrowIcon/forwardArrowIcon";
import { SVG_ICON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/svgIcon";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/types";
import { ContentsTab } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/components/ContentsTab/contentsTab";
import { Outline } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { useScrollMarginTop } from "./hook";
import { groupReleasesByYear } from "./utils";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const ReleasesView = (props: PageProps): JSX.Element => {
  const scrollMarginTop = useScrollMarginTop();
  const releasesByYear = groupReleasesByYear(props.releases);
  return (
    <Fragment>
      <SectionHero {...props} />
      <SectionContent
        content={
          <Stack gap={8} useFlexGap>
            {[...releasesByYear].map(([year, releases]) => (
              <Stack key={year} gap={4} useFlexGap>
                <Typography
                  component="h3"
                  variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}
                >
                  {year}
                </Typography>
                {releases.map((release, index) => (
                  <StyledCard
                    key={index}
                    id={release.id}
                    elevation={1}
                    sx={{ scrollMarginTop }}
                  >
                    <CardActionArea cardUrl={release.url}>
                      <Stack gap={0} useFlexGap>
                        <CardSecondaryText>
                          {release.timeSinceRelease} ago
                        </CardSecondaryText>
                        <CardTitle>{release.month} Release</CardTitle>
                      </Stack>
                      <ForwardArrowIcon
                        color={SVG_ICON_PROPS.COLOR.PRIMARY}
                        fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL}
                      />
                    </CardActionArea>
                  </StyledCard>
                ))}
              </Stack>
            ))}
          </Stack>
        }
        outline={renderOutline(props.outline)}
        slug={props.slug}
      />
    </Fragment>
  );
};

/**
 * Renders page outline.
 * @param outline - Outline items.
 * @returns outline.
 */
function renderOutline(
  outline?: OutlineItem[] | null
): JSX.Element | undefined {
  if (!outline) return;
  if (outline.length === 0) return;
  return <Outline outline={outline} Contents={ContentsTab} />;
}
