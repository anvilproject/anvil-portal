import "@clevercanary/data-explorer-ui";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { AppLayout, Footer, Header, Main } from "../components";
import { Head } from "../components/common/Head/head";
import config from "../site-config/anvil-portal/config";
import { mergeAppTheme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const { themeOptions, layout } = config;
  const defaultTheme = createAppTheme(themeOptions);
  const appTheme = mergeAppTheme(defaultTheme);
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
