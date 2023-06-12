import NextHead from "next/head";

export const Head = (): JSX.Element => {
  return (
    <NextHead key="page-head">
      <title>The AnVIL</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="icon" href="/favicons/favicon.ico" />
    </NextHead>
  );
};
