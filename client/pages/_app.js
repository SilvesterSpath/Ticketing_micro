import 'bootstrap/dist/css/bootstrap.css';

// costum app component, wrapper around the component
export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
