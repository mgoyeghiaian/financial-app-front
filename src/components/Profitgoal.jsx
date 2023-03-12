
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logob from '../assets/Logo-bRound.png'
import Logow from '../assets/Logo-wRound.png'
import './Profitgoal.css'


const Profitgoal = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/profitgoalf')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  const fixedIncome = parseInt(data[0].FIncome);
  const fixedExpenses = parseInt(data[0].FExpenses);

  const totalProfit = fixedIncome - fixedExpenses;

  console.log(totalProfit)
  return (
    <div className='profit-main'>
      <div className='profit-card'>
        <img src={Logob} alt='' />
        <h2>Total Profit</h2>
        <p>${totalProfit}</p>
      </div>
      <div className='profit-card2'>
        <img src={Logow} alt='' />
        <h2>Total Expenses</h2>
        <p>$ {fixedExpenses}</p>
      </div>

      <div className='profit-card2'>
        <img src={Logow} alt='' />
        <h2>Total Income</h2>
        <p> ${fixedIncome}</p>
      </div>
    </div >

  );
};
export default Profitgoal
