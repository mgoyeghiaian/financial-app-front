import React from 'react';
import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import moment from 'moment';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    if (csrfToken) {
      const token = csrfToken.getAttribute('content');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
      axios
        .post('http://127.0.0.1:8000/api/login', { email, password })
        .then((response) => {
          // Save the token and expiration date and time in the local storage
          const expiresIn = 86400; // 1 day in seconds
          const expiresAt = moment().add(expiresIn, 'seconds');
          if ((response.data.status = 201)) {
            sessionStorage.setItem('userType', response.data.user_type);
            sessionStorage.setItem('userToken', response.data.access_token);
            sessionStorage.setItem('expiresAt', expiresAt);
            window.location.href = "/home";
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setError(error.response.data.error); // set the error message
        });
    } else {
      console.log('Could not find CSRF token element');
    }
  };
  return (
    <div className='login-body'>
       <div className='login-card'>
         {error && <div>{error}</div>}
         <form className='login-form' onSubmit={handleSubmit}>
           <label htmlFor='email'>Username:</label>
           <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
           <label htmlFor='password'>Password:</label>
           <input id='password'ttype="password" value={password} onChange={(e) => setPassword(e.target.value)} />
           <button className='login-button button' type='submit'>
             Log In
           </button>
         </form>
       </div>
     </div>
  );
}

export default Login;