import "@databiosphere/findable-ui";
import { Error } from "@databiosphere/findable-ui/lib/components/Error/error";
import { ErrorBoundary } from "@databiosphere/findable-ui/lib/components/ErrorBoundary/errorBoundary";
import { Header as DXHeader } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";
import { setFeatureFlags } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/common/utils";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";
import { ConfigProvider } from "@databiosphere/findable-ui/lib/providers/config";
import { ExploreStateProvider } from "@databiosphere/findable-ui/lib/providers/exploreState";
import { LayoutDimensionsProvider } from "@databiosphere/findable-ui/lib/providers/layoutDimensions/provider";
import { ServicesProvider } from "@databiosphere/findable-ui/lib/providers/services/provider";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import { createBreakpoints } from "@mui/system";
import { deepmerge } from "@mui/utils";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { JSX, useEffect } from "react";
import TagManager from "react-gtm-module";
import { AppLayout, Footer as DXFooter, Main as DXMain } from "../components";
import { Head } from "../components/common/Head/head";
import { DEFAULT_DESCRIPTION } from "../components/common/OgMeta/constants";
import { OgMeta } from "../components/common/OgMeta/ogMeta";
import { getNavigation } from "../components/Consortia/featureFlag/utils";
import { config } from "../config/config";
import { BREAKPOINTS } from "../site-config/common/constants";
import { mergeAppTheme } from "../theme/theme";

export type NextPageWithComponent = NextPage & {
  Footer?: typeof DXFooter;
  Main?: typeof DXMain;
};

export type AppPropsWithComponent = AppProps & {
  Component: NextPageWithComponent;
};

setFeatureFlags(["gregor", "primed"]);

const DEFAULT_ENTITY_LIST_TYPE = "citations";

function MyApp(props: AppPropsWithComponent): JSX.Element {
  const { Component, pageProps } = props;
  const Footer = Component.Footer || DXFooter;
  const Main = Component.Main || DXMain;
  const appConfig = config();
  const { analytics, appTitle, layout, portalURL, themeOptions } = appConfig;
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const {
    entityListType = DEFAULT_ENTITY_LIST_TYPE,
    pageDescription,
    pageTitle,
  } = pageProps;
  const appTheme = mergeAppTheme(themeOptions);
  const isGREGoREnabled = useFeatureFlag("gregor");
  const isPRIMEDEnabled = useFeatureFlag("primed");
  const navigation = getNavigation(
    isGREGoREnabled,
    isPRIMEDEnabled,
    layout.header.navigation
  );

  // Initialize Google Tag Manager.
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ auth: gtmAuth, gtmId, preview: gtmPreview });
    }
  }, [gtmAuth, gtmId, gtmPreview]);

  return (
    <AppCacheProvider {...props}>
      <EmotionThemeProvider theme={appTheme}>
        <ThemeProvider theme={appTheme}>
          <ConfigProvider config={appConfig} entityListType={entityListType}>
            <Head appTitle={appTitle} pageTitle={pageTitle} />
            <OgMeta
              appTitle={appTitle}
              defaultDescription={DEFAULT_DESCRIPTION}
              pageDescription={pageDescription}
              pageTitle={pageTitle}
              portalURL={portalURL}
            />
            <CssBaseline />
            <ServicesProvider>
              <LayoutDimensionsProvider>
                <AppLayout>
                  <ThemeProvider
                    theme={(theme: Theme): Theme => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- MUI internal property 'vars' is automatically added when cssVariables is enabled.
                      const { vars, ...themeWithoutVars } = theme;
                      return createTheme(
                        deepmerge(themeWithoutVars, {
                          breakpoints: createBreakpoints(BREAKPOINTS),
                        })
                      );
                    }}
                  >
                    <DXHeader {...layout.header} navigation={navigation} />
                  </ThemeProvider>
                  <ExploreStateProvider entityListType={entityListType}>
                    <Main>
                      <ErrorBoundary
                        fallbackRender={({ error, reset }): JSX.Element => (
                          <Error
                            errorMessage={error.message}
                            onReset={reset}
                            rootPath="/"
                          />
                        )}
                      >
                        <Component {...pageProps} />
                      </ErrorBoundary>
                    </Main>
                  </ExploreStateProvider>
                  <Footer {...layout.footer} />
                </AppLayout>
              </LayoutDimensionsProvider>
            </ServicesProvider>
          </ConfigProvider>
        </ThemeProvider>
      </EmotionThemeProvider>
    </AppCacheProvider>
  );
}

export default MyApp;
