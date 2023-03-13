import React, { useEffect } from 'react';
import './home.css';
import { useState } from 'react';
import axios from 'axios';
import { YAxis } from 'recharts';

const Targetgoal = () => {
  const [netProfit, setNetProfit] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [Fixeddata, setFixedData] = useState([]);

  console.log(Fixeddata)

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

  useEffect(() => {
    if (selectedYear) {
      getProfityear(selectedYear);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear) {
      getFixedyear(selectedYear);
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

  return (
    <div className='home-tg-body'>
      <div className='home-tg-card'>
        <h1>Target Goal</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='net-profit-input'>Add Target Amount: </label>
          <br />
          <input type='number' id='net-profit-input' value={netProfit} onChange={handleNetProfitChange} />
          <br />
          <button type='submit'>Add</button>
        </form>
        <div>
          <label htmlFor='year-input'>Select Year:</label>
          <select id='year-input' onChange={handleYearChange}>
            <option value=''>Select Year</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
          </select>
        </div>

        {selectedYear ? (
          data.length ? (
            data.map((item, index) => (
              <div key={index}>
                <h3>Target Amount: ${item.netProfit}</h3>
                <p></p>
                <h4>Total Profit: ${Fixeddata.total_amount}</h4>
                <h4>Remaining Profit: ${item.netProfit - Fixeddata.total_amount}</h4>
                <button type='button' onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <h4>No data found for the selected year.</h4>
          )
        )
          : (
            <h4>Please select a year to see the data.</h4>
          )}
      </div>
    </div>
  );
};

export default Targetgoal;
