import NextHead from "next/head";

export interface HeadProps {
  appTitle: string;
  pageTitle?: string;
}

export const Head = ({ appTitle, pageTitle }: HeadProps): JSX.Element => {
  const title = pageTitle ? `${pageTitle} - ${appTitle}` : appTitle;
  return (
    <NextHead key="page-head">
      <link href="/consortia/favicons/favicon.ico" rel="icon" sizes="any" />
      <link
        href="/consortia/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/consortia/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
        type="image/png"
      />
      <link href="/consortia/favicons/site.webmanifest" rel="manifest" />
      <title>{title}</title>
    </NextHead>
  );
};
