import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";
import "../styles/global.css";

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
