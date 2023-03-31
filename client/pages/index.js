import buildClient from '../api/buildClient';

const LandingPage = (/* { color } */ { currentUser }) => {
  /*  console.log('I am in the component!', color); */
  /* console.log(currentUser); */
  /* axios.get('/api/users/currentuser'); */

  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
