import "@clevercanary/data-explorer-ui";
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
import { Header } from "../components/Layout/components/Header/header";
import { config } from "../config/config";
import { setFeatureFlags } from "../hooks/useFeatureFlag/common/utils";
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
  const { analytics, layout, themeOptions } = config();
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
        <Head />
        <CssBaseline />
        <LayoutStateProvider>
          <AppLayout>
            <Header {...layout.header} />
            <Main>
              <Component {...pageProps} />
            </Main>
            <Footer {...layout.footer} />
          </AppLayout>
        </LayoutStateProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
