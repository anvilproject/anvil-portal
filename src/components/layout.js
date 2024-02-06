/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL layout component; works as wrapper around site component.
 */

// Core dependencies
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useRef, useState } from "react";

// App dependencies
import { SITE, useConfig } from "../hooks/useConfig";
import { getAppTheme } from "../theme/theme";
import BannerPrivacy from "./banner-privacy/banner-privacy";
import Footer from "./footer/footer";
import Header from "./header/header";
import Headline from "./headline/headline";
import Main from "./main/main";
import ProviderModal from "./modal/provider-modal/provider-modal";
import PageHead from "./page-head/page-head";
import ProviderAnVILPortal from "./provider-anvil-portal/provider-anvil-portal";
import SEO from "./seo/SEO";
import SiteExternalLinkTracker from "./site-external-link-tracker/site-external-link-tracker";
import ProviderSiteSearch from "./site-search/provider-site-search/provider-site-search";
import SiteWrapper from "./site-wrapper/site-wrapper";

// Styles
import "../styles/vars.module.css";

function Layout(props) {
  const {
    children,
    description,
    docPath,
    homePage,
    navigation,
    ncpi,
    noSpy,
    showOutline,
    title,
  } = props;
  const { tabs, title: headlineTitle } = navigation || {};
  const refSite = useRef(null);
  const [bannerHeight, setBannerHeight] = useState(0);
  const site = ncpi ? SITE.NCPI : SITE.ANVIL;
  const siteTitle = ncpi ? "NCPI" : "The AnVIL";
  const currentConfig = useConfig(site);
  return (
    <ThemeProvider theme={getAppTheme(currentConfig.theme)}>
      <CssBaseline />
      <ProviderAnVILPortal>
        <ProviderSiteSearch search={currentConfig.search}>
          <PageHead pageTitle={title} site={siteTitle} />
          <SEO
            description={description}
            ncpi={ncpi}
            site={siteTitle}
            title={title}
          />
          <ProviderModal>
            <SiteExternalLinkTracker pageTitle={title} refSite={refSite}>
              <SiteWrapper ref={refSite}>
                <Header
                  header={currentConfig.layout.header}
                  searchPath={currentConfig.search.searchPath}
                />
                {homePage ? null : (
                  <Headline tabs={tabs} title={headlineTitle} />
                )}
                <Main
                  bannerHeight={bannerHeight}
                  docPath={docPath}
                  homePage={homePage}
                  navigation={navigation}
                  noSpy={noSpy}
                  showOutline={showOutline}
                >
                  {children}
                </Main>
                <BannerPrivacy setBannerHeight={setBannerHeight} />
                <Footer />
                <div id="modal-root" />
                <div id="tooltip-root" />
              </SiteWrapper>
            </SiteExternalLinkTracker>
          </ProviderModal>
        </ProviderSiteSearch>
      </ProviderAnVILPortal>
    </ThemeProvider>
  );
}

export default Layout;
