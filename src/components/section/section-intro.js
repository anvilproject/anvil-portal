/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - section intro component.
 *
 * To access the content for the section introductions see /content/home/section-intro/.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import { SectionIntroStaticQuery } from "../../hooks/section-intro-query";
import Markdown from "../markdown/markdown";
import SectionSplash from "../section-splash/section-splash";
import * as HomeService from "../../utils/home.service";

// Styles
import * as compStyles from "./section-intro.module.css";
import * as globalStyles from "../../styles/global.module.css";

class SectionIntro extends React.Component {
  render() {
    const { end, sectionIntro, sectionTitle, start, stretch, wrap } =
        this.props,
      { frontmatter, htmlAst } = sectionIntro || {},
      { title } = frontmatter || {},
      intro = title || sectionTitle;

    return (
      <div
        className={classNames(
          globalStyles.grid,
          globalStyles.g750,
          globalStyles.flex,
          compStyles.sectionIntro,
          { [compStyles.end]: end },
          { [compStyles.start]: start },
          { [compStyles.stretch]: stretch }
        )}
      >
        <h1 className={classNames({ [compStyles.wrap]: wrap })}>{intro}</h1>
        <SectionSplash end={end} start={start} stretch={stretch}>
          {htmlAst ? <Markdown>{htmlAst}</Markdown> : null}
        </SectionSplash>
      </div>
    );
  }
}

export default (props) => {
  const { fileName } = props;
  const sectionIntro = HomeService.findSectionIntro(
    fileName,
    SectionIntroStaticQuery()
  );

  return <SectionIntro sectionIntro={sectionIntro} {...props} />;
};
