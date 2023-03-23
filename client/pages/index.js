import axios from 'axios';

const LandingPage = (/* { color } */ { currentUser }) => {
  /*  console.log('I am in the component!', color); */
  console.log(currentUser);
  axios.get('/api/users/currentuser');
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  /*   console.log('I am on the server!');
  return { color: 'red' }; */
  const response = await axios.get('/api/users/currentuser');

  return response.data;
};

export default LandingPage;
