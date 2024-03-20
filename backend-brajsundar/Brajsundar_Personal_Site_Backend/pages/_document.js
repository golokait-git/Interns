import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link href="assets/css/main.css" rel="stylesheet"/>
      </Head>
      <body className="scrollrule">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
