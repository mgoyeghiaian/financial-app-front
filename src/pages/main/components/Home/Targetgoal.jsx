import React, { useEffect } from 'react';
import './home.css';
import { useState } from 'react';
import axios from 'axios';
const Targetgoal = () => {
  const [netProfit, setNetProfit] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [Fixeddata, setFixedData] = useState([]);
  const [Recurringdata, setRecurringData] = useState([]);


  // console.log(Recurringdata)
  // console.log(Fixeddata)
  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/profitgoal', {
        netprofit: netProfit,
        isdeleted: isDeleted,
      });
      getProfityear(selectedYear);
      setNetProfit('');
      setIsDeleted(false);
    } catch (error) {
      console.error(error);
    }
  };


  const getProfityear = async (year) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/profitgoal?year=${year}`);
    const filteredData = res.data.message.filter((item) => item.year === year && item.isDeleted === 0);
    setData(filteredData);

  };

  const getFixedyear = async (year) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/fixedf?year=${year}`);
    const filteredFidexData = res.data;
    setFixedData(filteredFidexData);

  };
  const getRecurringyear = async (year) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/recurringf?year=${year}`);
    const filteredRecurringData = res.data;
    setRecurringData(filteredRecurringData);

  };


  useEffect(() => {
    if (selectedYear) {
      getFixedyear(selectedYear);
      getProfityear(selectedYear);
      getRecurringyear(selectedYear);
    }
  }, [selectedYear]);

  const handleNetProfitChange = (e) => {
    setNetProfit(e.target.value);
  };

  const handleIsDeletedChange = (e) => {
    setIsDeleted(e.target.checked);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/profitgoal/${id}`);
      getProfityear(selectedYear);
    } catch (error) {
      console.error(error);
    }
  };



  //Date Selector Function 
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = 2018; year <= currentYear; year++) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  // Date Selector Finish here
  const total_amount = Fixeddata.total_amount + Recurringdata.total_amount;
  console.log(total_amount)
  return (
    <div className='home-tg-body'>
      <div className='home-tg-card'>
        <h1>Target Goal</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='net-profit-input'>Add Target Amount</label>
          <input type='number' id='net-profit-input' value={netProfit} onChange={handleNetProfitChange} />
          <button className='Target-B' type='submit'>Add</button>
        </form>
        <label htmlFor='year-input'></label>
        <select id='year-input' value={selectedYear} onChange={handleYearChange}>
          <option value=''>Select a year</option>
          {yearOptions}
        </select>
        <div className='trgt-gl-wrpr'>
          {
            selectedYear ? (
              data.length ? (
                data.map((item, index) => (
                  <div key={index} className="trgt-gl">

                    <h4>Target Amount</h4>
                    <span>${item.netProfit}</span>
                    <h4>Total Profit</h4>
                    <span>${total_amount}</span>
                    <h4>Remaining Profit</h4>
                    <span>${item.netProfit - total_amount}</span>
                    <button className='Target-B Target-c' type='button' onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>


                ))
              ) : (
                <h4 className='h4-tgcard'>No data found for the selected year.</h4>
              )
            )
              : (
                <h4 className='h4-tgcard'>Please select a year to see the data.</h4>
              )
          }
        </div >
      </div >
    </div >
  );
};

export default Targetgoal;