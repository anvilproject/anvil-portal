import "@clevercanary/data-explorer-ui";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { AppLayout, Footer, Header, Main } from "../components";
import { Head } from "../components/common/Head/head";
import { config } from "../config/config";
import { mergeAppTheme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
        <AppLayout>
          <Header {...layout.header} />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer {...layout.footer} />
        </AppLayout>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
