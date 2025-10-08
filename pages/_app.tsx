import "@databiosphere/findable-ui";
import { Header as DXHeader } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";
import { ConfigProvider } from "@databiosphere/findable-ui/lib/providers/config";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { createBreakpoints } from "@mui/system";
import { deepmerge } from "@mui/utils";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { AppLayout, Footer as DXFooter, Main as DXMain } from "../components";
import { Head } from "../components/common/Head/head";
import { config } from "../config/config";
import { BREAKPOINTS } from "../site-config/common/constants";
import { mergeAppTheme } from "../theme/theme";
import { LayoutDimensionsProvider } from "@databiosphere/findable-ui/lib/providers/layoutDimensions/provider";
import { setFeatureFlags } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/common/utils";
import { useFeatureFlag } from "@databiosphere/findable-ui/lib/hooks/useFeatureFlag/useFeatureFlag";
import { getNavigation } from "../components/Consortia/featureFlag/utils";

export type NextPageWithComponent = NextPage & {
  Footer?: typeof DXFooter;
  Main?: typeof DXMain;
};

export type AppPropsWithComponent = AppProps & {
  Component: NextPageWithComponent;
};

setFeatureFlags(["gregor", "primed"]);

function MyApp({ Component, pageProps }: AppPropsWithComponent): JSX.Element {
  const Footer = Component.Footer || DXFooter;
  const Main = Component.Main || DXMain;
  const appConfig = config();
  const { analytics, appTitle, layout, themeOptions } = appConfig;
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const { pageTitle } = pageProps;
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
    <EmotionThemeProvider theme={appTheme}>
      <ThemeProvider theme={appTheme}>
        <ConfigProvider config={appConfig}>
          <Head appTitle={appTitle} pageTitle={pageTitle} />
          <CssBaseline />
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
              <Main>
                <Component {...pageProps} />
              </Main>
              <Footer {...layout.footer} />
            </AppLayout>
          </LayoutDimensionsProvider>
        </ConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
