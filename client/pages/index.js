import buildClient from '../api/buildClient';

const LandingPage = (/* { color } */ { currentUser }) => {
  /*  console.log('I am in the component!', color); */
  /* console.log(currentUser); */
  /* axios.get('/api/users/currentuser'); */

  console.log(currentUser);
  return currentUser ? <h1>You are signed in</h1> : <h1>Please sign in..</h1>;
};

LandingPage.getInitialProps = async (context) => {
  console.log('Landing Page');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
