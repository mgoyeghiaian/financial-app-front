// import React, { useRef } from 'react';
// import { useState } from 'react';
// import './Login.css';
// import axios from 'axios';
// import moment from 'moment';

// function Login() {
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [error, setError] = useState(null);
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const csrfToken = document.querySelector('meta[name="csrf-token"]');
//     if (csrfToken) {
//       const token = csrfToken.getAttribute('content');
//       axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
//       axios
//         .post('http://127.0.0.1:8000/api/login', { email, password })
//         .then((response) => {
//           // Save the token and expiration date and time in the local storage
//           const expiresIn = 86400; // 1 day in seconds
//           const expiresAt = moment().add(expiresIn, 'seconds');
//           if ((response.data.status = 201)) {
//             sessionStorage.setItem('userType', response.data.user_type);
//             sessionStorage.setItem('userToken', response.data.access_token);
//             sessionStorage.setItem('expiresAt', expiresAt);
//             window.location.href = "/home";
//           }
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error.response.data.error);
//           setError(error.response.data.error); // set the error message
//         });
//     } else {
//       console.log('Could not find CSRF token element');
//     }
//   };

//   const handleInputFocus = (ref) => {
//     if (ref.current.value) {
//       ref.current.focus();
//     }
//   };

//   return (
//     <div className='login-body'>
//       <div className='R-left'></div>
//        <div className='login-card'>
//          <h1>Log in</h1>
//          {error && <p className='err-msg'>{error}</p>}
//          <form className='login-form' onSubmit={handleSubmit}>
//            <label htmlFor='email'>
//             <input
//               id='email'
//               type="email"
//               value={email || ''}
//               onChange={(e) => setEmail(e.target.value)}
//               ref={emailRef}
//               onFocus={() => handleInputFocus(emailRef)}
//               autofocus
//             />
//            </label>
//            <label htmlFor='password'>
//             <input
//               id='password'
//               type="password"
//               value={password || ''}
//               onChange={(e) => setPassword(e.target.value)}
//               ref={passwordRef}
//               onFocus={() => handleInputFocus(passwordRef)}
//             />
//            </label>
//            <button className='login-button' type='submit'>
//              Log In
//            </button>
//          </form>
//        </div>
//      </div>
//   );
// }

// export default Login;








































import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './Login.css';
import axios from 'axios';
import moment from 'moment';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

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
  function updateLabel(input) {
    const label = input.nextElementSibling;
    if (input.value.length > 0) {
      input.classList.add("has-value");
      label.classList.add("has-value");
    } else {
      input.classList.remove("has-value");
      label.classList.remove("has-value");
    }
  }

  const inputs = document.querySelectorAll(".input-group input");
  inputs.forEach(input => {
    updateLabel(input);
    input.addEventListener("input", () => updateLabel(input));
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const carousel = carouselRef.current;
      const slideWidth = carousel.offsetWidth;
      const currentSlide = Math.round(carousel.scrollLeft / slideWidth);
      const nextSlide = currentSlide === 2 ? 0 : currentSlide + 1;
      carousel.scroll({
        left: nextSlide * slideWidth,
        behavior: 'smooth'
      });
      setCurrentSlide(nextSlide);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className='login-body'>
      <div className='R-left'>
        <div className='carousel-parent'>
        <ul className='carousel-wrapper' ref={carouselRef}onScroll={(e) => {
          const scrollPosition = e.target.scrollLeft;
          const slideWidth = e.target.offsetWidth;
          const newSlide = Math.round(scrollPosition / slideWidth);
          setCurrentSlide(newSlide);
        }}>
          <li className="carousel-child carousel-child-1">
            <p className='grand-child g-child-1'><span>Detailed analysis</span> <br></br><br></br>Have a detailed analysis on your work.</p>
          </li>
          <li className="carousel-child carousel-child-2">
            <p className='grand-child g-child-2'><span>Detailed Statistics</span> <br></br><br></br>Statistics are what matters the most.</p>
          </li>
          <li className="carousel-child carousel-child-3">
            <p className='grand-child g-child-3'><span>Detailed Evaluation</span> <br></br><br></br>Evaluate your work in order to grow.</p>
          </li>
        </ul>
        <ul className='indicator'>
          <li className={`indicator-child child-1 ${currentSlide === 0 ? 'active' : ''}`}></li>
          <li className={`indicator-child child-2 ${currentSlide === 1 ? 'active' : ''}`}></li>
          <li className={`indicator-child child-3 ${currentSlide === 2 ? 'active' : ''}`}></li>
        </ul>
        </div>
      </div>
       <div className='login-card'>
          <h1 className='wlcm-h1'>Welcome Back!</h1>
          <div className="form-wrapper">
            <div className='called'>
          <h1 className='lg-head'>Log in</h1>
          {error && <p className='err-msg'>{error}</p>}
            <form autoComplete="off"
              action="" onSubmit={handleSubmit} className='hashish'>
              <div className="input-group">
                <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-group" >
                <input id='password'type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="password">Password</label>
              </div>
              <button className="login-button" type="submit">Login</button>
            </form>
            </div>
        </div>
        <p className='inf-msg'>Having problems while logging in? Plz contact the SuperAdmin</p>
       </div>
     </div>
  );
}

export default Login;




















// import React from 'react';
// import { useState, useRef} from 'react';
// import './Login.css';
// import axios from 'axios';
// import moment from 'moment';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const emailInputRef = useRef(null);
//   const passwordInputRef = useRef(null);

//   const handleEmailInputChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);
//   };

//   const handlePasswordInputChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);
//   };

//   const handleInputFocus = (inputRef) => {
//     inputRef.current.focus();
//   };

//   const handleEmailBlur = () => {
//     if (email.length > 0) {
//       handleInputFocus(emailInputRef);
//     }
//   };

//   const handlePasswordBlur = () => {
//     if (password.length > 0) {
//       handleInputFocus(passwordInputRef);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const csrfToken = document.querySelector('meta[name="csrf-token"]');
//     if (csrfToken) {
//       const token = csrfToken.getAttribute('content');
//       axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
//       axios
//         .post('http://127.0.0.1:8000/api/login', { email, password })
//         .then((response) => {
//           // Save the token and expiration date and time in the local storage
//           const expiresIn = 86400; // 1 day in seconds
//           const expiresAt = moment().add(expiresIn, 'seconds');
//           if ((response.data.status = 201)) {
//             sessionStorage.setItem('userType', response.data.user_type);
//             sessionStorage.setItem('userToken', response.data.access_token);
//             sessionStorage.setItem('expiresAt', expiresAt);
//             window.location.href = "/home";
//           }
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error.response.data.error);
//           setError(error.response.data.error); // set the error message
//         });
//     } else {
//       console.log('Could not find CSRF token element');
//     }
//   };

//   return (
//     <div className='login-body'>
//       <div className='R-left'></div>
//        <div className='login-card'>
//          <h1>Log in</h1>
//          {error && <p className='err-msg'>{error}</p>}
//          <form className='login-form' onSubmit={handleSubmit}>
//            <label htmlFor='email'>
//             <input id='email' type="email" value={email} onChange={handleEmailInputChange} onBlur={handleEmailBlur} ref={emailInputRef} />
//            </label>
//            <label htmlFor='password'>
//             <input id='password'type="password" value={password} onChange={handlePasswordInputChange} onBlur={handlePasswordBlur} ref={passwordInputRef} />
//             </label>
//             <button className='login-button' type='submit'>
//               Log In
//             </button>
//             </form>
//             </div>
//             </div>
//             );
//             }

//             export default Login;