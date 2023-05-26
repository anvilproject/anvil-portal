import type { AppProps } from "next/app";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ContentLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/ContentLayout/contentLayout";
import { Main } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main.styles";
import { AppLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { config } from "../config/dev/config";

function MyApp({ Component, pageProps }: AppProps) {
  const { themeOptions } = config;
  const theme = createAppTheme(themeOptions);
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <Main>
            <ContentLayout content={<Component {...pageProps} />} />
          </Main>
        </AppLayout>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
