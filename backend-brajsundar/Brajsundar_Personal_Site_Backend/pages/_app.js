import { Provider } from "react-redux";
import store from "../store/index";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Router from "next/router";
import { appWithTranslation } from 'next-i18next'
import { i18n } from '../i18n'
import "@fortawesome/fontawesome-svg-core/styles.css";


export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  const preloaderStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '9999',
  };

  const loaderStyles = {
    border: '6px solid #3498db',
    borderTop: '6px solid #f3f3f3',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  };
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        {/* Preloader */}
        {loading && (
          <div style={preloaderStyles} >

            <div style={loaderStyles}>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <Component {...pageProps} />
        )}
      </Provider>
    </SessionProvider>
  );
}
