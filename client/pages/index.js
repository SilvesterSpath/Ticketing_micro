import axios from 'axios';

const LandingPage = (/* { color } */ { currentUser }) => {
  /*  console.log('I am in the component!', color); */
  /* console.log(currentUser); */
  /* axios.get('/api/users/currentuser'); */

  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async () => {
  /*   console.log('I am on the server!');
  return { color: 'red' }; */
  /*   const response = await axios.get('/api/users/currentuser');

  return response.data; */
  if (typeof window === 'undefined') {
    // we are on the server!
    // requests should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          Host: 'ticketing.dev',
        },
      }
    );
    return data;
  } else {
    // we are on the browser!
    // requests can be made with a base url of '', we rely on the browser to fill out the base url
    const { data } = await axios.get('/api/users/currentuser');
    // { currentuser: null or {}}

    return data;
  }
};

export default LandingPage;
