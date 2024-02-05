import "@clevercanary/data-explorer-ui";
import { Header as DXHeader } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { LayoutStateProvider } from "@clevercanary/data-explorer-ui/lib/providers/layoutState";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { AppLayout, Footer as DXFooter, Main as DXMain } from "../components";
import { Head } from "../components/common/Head/head";
import { config } from "../config/config";
import { setFeatureFlags } from "../hooks/useFeatureFlag/common/utils";
import { ConfigProvider } from "../providers/config";
import { mergeAppTheme } from "../theme/theme";

setFeatureFlags();

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
  const { analytics, layout, themeOptions } = appConfig;
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
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
          <Head />
          <CssBaseline />
          <LayoutStateProvider>
            <AppLayout>
              <DXHeader {...layout.header} />
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
