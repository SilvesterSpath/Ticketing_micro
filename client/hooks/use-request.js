import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  // we are assuming that method should looke like this
  // method === 'post', 'get', 'patch', 'put', 'delete';

  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      // we might need later the response.data
      onSuccess(response.data);
      return response.data;
    } catch (err) {
      setErrors(
        <div className='alert alert-danger'>
          <h3>Oooops..</h3>
          <ul className='my-0'>
            {err.response.data.errors.map((item, idx) => (
              <li key={item.message}>{item.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
