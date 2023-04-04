import buildClient from '../api/buildClient';
import 'bootstrap/dist/css/bootstrap.css';

// costum app component, wrapper around the component
const AppComponent = ({ Component, pageProps }) => {
  return (
    <>
      {' '}
      <h1>Header</h1>
      <Component {...pageProps} />;
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  /*   const pageProps = await appContext.Component.getInitialProps(appContext.ctx);

  console.log('pageProps: ', pageProps); */

  console.log('data: ', data);

  return data;
};

export default AppComponent;
