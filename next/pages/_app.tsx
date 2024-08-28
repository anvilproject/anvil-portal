import "@databiosphere/findable-ui";
import { Header as DXHeader } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";
import { LayoutStateProvider } from "@databiosphere/findable-ui/lib/providers/layoutState";
import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
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
import { ConfigProvider } from "../providers/config";
import { BREAKPOINTS } from "../site-config/common/constants";
import { mergeAppTheme } from "../theme/theme";

export type NextPageWithComponent = NextPage & {
  Footer?: typeof DXFooter;
  Main?: typeof DXMain;
};

export type AppPropsWithComponent = AppProps & {
  Component: NextPageWithComponent;
};

function MyApp({ Component, pageProps }: AppPropsWithComponent): JSX.Element {
  const Footer = Component.Footer || DXFooter;
  const Main = Component.Main || DXMain;
  const appConfig = config();
  const { analytics, appTitle, layout, themeOptions } = appConfig;
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const { pageTitle } = pageProps;
  const defaultTheme = createAppTheme(themeOptions);
  const appTheme = mergeAppTheme(defaultTheme);

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
          <LayoutStateProvider>
            <AppLayout>
              <ThemeProvider
                theme={(theme: Theme): Theme =>
                  createTheme(
                    deepmerge(theme, {
                      breakpoints: createBreakpoints(BREAKPOINTS),
                    })
                  )
                }
              >
                <DXHeader {...layout.header} />
              </ThemeProvider>
              <Main>
                <Component {...pageProps} />
              </Main>
              <Footer {...layout.footer} />
            </AppLayout>
          </LayoutStateProvider>
        </ConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
