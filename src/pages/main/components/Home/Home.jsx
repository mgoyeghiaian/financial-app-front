import React from 'react'
import Hero from './Hero'
import Report from './Report'
import Navbar from '../../../../components/Navbar'
import Targetgoal from './Targetgoal'
import "./home.css"
import Profitgoal from '../../../../components/Profitgoal'


const Home = () => {
  return (
    <>
      <div className='home-body'>
        <div className='home-left'>
          <Navbar />
        </div>
        <div className='home-middle'>
          <div className="home-mid-ch1"><Profitgoal /></div>
          <div className="home-mid-ch2"><Hero /></div>
        </div>
        <div className='home-right'>
          <Targetgoal />
        </div>
        <div className='home-report'>
          <Report />
        </div>
      </div>
    </>
  )
}

export default Home






















// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// import Hero from './Hero';
// import Report from './Report';
// import Navbar from '../../../../components/Navbar';
// import Targetgoal from './Targetgoal';
// import "./home.css";
// import Profitgoal from '../../../../components/Profitgoal';

// const Home = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const tokenTimer = setInterval(() => {
//       const expiresAt = sessionStorage.getItem('expiresAt');
//       if (moment().isAfter(moment(expiresAt))) {
//         // Clear the local storage and log out the user if the token has expired
//         sessionStorage.clear(); 
//         window.location.href = "/";
//       }
//     }, 1000); // Check every second

//     return () => clearInterval(tokenTimer); // Clear the interval when the component unmounts
//   }, [navigate]);
 
//   return (
//     <>
//       <div className='home-body'>
//         <div className='home-left'>
//           <Navbar />
//         </div>
//         <div className='home-middle'>
//           <div className="home-mid-ch1"><Profitgoal /></div>
//           <div className="home-mid-ch2"><Hero /></div>
//         </div>
//         <div className='home-right'>
//           <Targetgoal />
//         </div>
//         <div className='home-report'>
//           <Report />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;