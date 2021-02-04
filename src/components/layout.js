/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL layout component; works as wrapper around site component.
 */

// Core dependencies
import React, {useRef, useState} from "react";

// App dependencies
import BannerPrivacy from "./banner-privacy/banner-privacy";
import Footer from "./footer/footer";
import Header from "./header/header";
import Main from "./main/main";
import PageHead from "./page-head/page-head";
import ProviderAnVILPortal from "./provider-anvil-portal/provider-anvil-portal";
import SEO from "./seo/seo";
import SiteExternalLinkTracker from "./site-external-link-tracker/site-external-link-tracker";
import SiteWrapper from "./site-wrapper/site-wrapper";

function Layout(props) {

    const {children, description, docPath, homePage, navigations, ncpi, noSpy, showOutline, styles, title} = props;
    const refSite = useRef(null);
    const [bannerHeight, setBannerHeight] = useState(0);
    const site = ncpi ? "NCPI" : "The AnVIL";

    return (
        <ProviderAnVILPortal>
            <PageHead pageTitle={title} site={site}/>
            <SEO description={description} ncpi={ncpi} site={site} title={title}/>
            <SiteExternalLinkTracker refSite={refSite}>
                <SiteWrapper ref={refSite}>
                    <Header ncpi={ncpi}/>
                    <Main bannerHeight={bannerHeight}
                          docPath={docPath}
                          homePage={homePage}
                          navigations={navigations}
                          noSpy={noSpy}
                          showOutline={showOutline}
                          styles={styles}>{children}</Main>
                    <BannerPrivacy setBannerHeight={setBannerHeight}/>
                    <Footer/>
                    <div id="portal"/>
                </SiteWrapper>
            </SiteExternalLinkTracker>
        </ProviderAnVILPortal>
    )
}

export default Layout;
