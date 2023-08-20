import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: "GTM-P6FBLTV",
    };
    TagManager.initialize(tagManagerArgs);
  }, []);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/logos/favicon.png" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
