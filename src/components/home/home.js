/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL homepage component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { Link } from "gatsby";
import React from "react";
import { isBrowser } from "react-device-detect";

// App dependencies
import Events from "../events/events";
import News from "../news/news";
import SectionBody from "../section/section-body";
import SectionIntro from "../section/section-intro";
import Stats from "../stats/stats";
import TwitterTimeline from "../twitter-timeline/twitter-timeline";
import Workspaces from "../workspaces/workspaces";

// Images
import logoDockstore from "../../../images/logo-dockstore.png";
import logoGen3 from "../../../images/logo-gen3.png";
import logoNCPI from "../../../images/logo-ncpi.png";
import logoTerra from "../../../images/logo-terra.png";

// Styles
import * as compStyles from "./home.module.css";
import * as globalStyles from "../../styles/global.module.css";

class Home extends React.Component {
  render() {
    return (
      <>
        <section
          className={classNames(compStyles.hero, {
            [compStyles.handheld]: !isBrowser,
          })}
        >
          <div
            className={classNames(
              globalStyles.grid,
              globalStyles.g750,
              globalStyles.centered
            )}
          >
            <div className={compStyles.headline}>
              Migrate Your Genomic Research to the Cloud
            </div>
            <div className={compStyles.subhead}>
              Analyze large, open & controlled-access genomic datasets with
              familiar tools and reproducible workflows in a secure cloud-based
              computing environment.
            </div>
            <div className={compStyles.tiles}>
              <div className={compStyles.tile}>
                <a
                  href="https://anvil.terra.bio/#workspaces"
                  rel="noopener"
                  target="_blank"
                >
                  <img
                    className={compStyles.tileLogo}
                    src={logoTerra}
                    alt="Terra"
                  />
                  <span>
                    <span className={globalStyles.asLink}>Launch Terra</span>,
                    AnVIL’s cloud computing environment.
                  </span>
                </a>
              </div>
              <div className={compStyles.tile}>
                <a
                  href="https://gen3.theanvil.io/"
                  rel="noopener"
                  target="_blank"
                >
                  <img
                    className={compStyles.tileLogo}
                    src={logoGen3}
                    alt="Gen3"
                  />
                  <span>
                    Create a virtual cohort in AnVIL’s{" "}
                    <span className={globalStyles.asLink}>
                      Gen3 Data Explorer
                    </span>
                    .
                  </span>
                </a>
              </div>
              <div className={compStyles.tile}>
                <a href="https://dockstore.org" rel="noopener" target="_blank">
                  <img
                    className={compStyles.tileLogo}
                    src={logoDockstore}
                    alt="Dockstore"
                  />
                  <span>
                    Discover and launch repeatable workflows with{" "}
                    <span className={globalStyles.asLink}>Dockstore</span>.
                  </span>
                </a>
              </div>
              <div className={compStyles.tile}>
                <Link to="/ncpi">
                  <img
                    className={compStyles.tileLogo}
                    src={logoNCPI}
                    alt="NCPI"
                  />
                  <span>
                    Explore emerging support for cross-platform data sharing and
                    analysis via the{" "}
                    <span className={globalStyles.asLink}>
                      NIH Cloud Platform Interoperability effort
                    </span>
                    .
                  </span>
                </Link>
              </div>
            </div>
            <Stats />
            <div className={compStyles.statsCaption}>
              <Link to="/data" className={globalStyles.asLink}>
                Explore AnVIL's datasets and learn how to request access.
              </Link>
            </div>
          </div>
        </section>
        <section className={compStyles.onboarding}>
          <SectionIntro end fileName={"get-started"} />
        </section>
        <section className={compStyles.accessing}>
          <SectionIntro fileName={"access-data"} start />
        </section>
        <section className={compStyles.submitting}>
          <SectionIntro end fileName={"contribute-data"} wrap />
        </section>
        <section className={compStyles.featured}>
          <SectionIntro fileName={"featured-workspaces"} stretch />
          <SectionBody>
            <Workspaces featured />
          </SectionBody>
        </section>
        <section className={compStyles.news}>
          <SectionIntro sectionTitle={"News"} stretch />
          <SectionBody>
            <News featured />
          </SectionBody>
        </section>
        <section className={compStyles.events}>
          <SectionIntro sectionTitle={"Events"} stretch />
          <SectionBody>
            <Events featured />
          </SectionBody>
        </section>
        <section className={compStyles.twitter}>
          <SectionIntro sectionTitle={"@useAnVIL on Twitter"} stretch />
          <SectionBody>
            <TwitterTimeline />
          </SectionBody>
        </section>
      </>
    );
  }
}

export default Home;
