import React, { useEffect } from 'react';
import './home.css';
import { useState } from 'react';
import axios from 'axios';

const Targetgoal = () => {
  const [netProfit, setNetProfit] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  // const [totalProfit, setTotalProfit] = useState('');
  // const [fixedProfit, setFixedProfit] = useState("");
  // const [recurringProfit, setRecurringProfit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/profitgoal', {
        netprofit: netProfit,
        isdeleted: isDeleted,
      });
      getGoal(selectedYear);
      setNetProfit('');
      setIsDeleted(false);
    } catch (error) {
      console.error(error);
    }
  };


  // useEffect(() => {
  //   fetch("http://localhost:8000/profitgoalf")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFixedProfit(data[0].result);
  //       setRecurringProfit(data[1].result);
  //       setTotalProfit(Number(data[0].result) + Number(data[1].result));
  //     })
  //     .catch((err) => console.log(err));
  // }, []);



  const getGoal = async (year) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/profitgoal?year=${year}`);
    const filteredData = res.data.message.filter((item) => item.year === year && item.isDeleted === 0);
    setData(filteredData);
  };

  useEffect(() => {
    if (selectedYear) {
      getGoal(selectedYear);
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
      getGoal(selectedYear);
    } catch (error) {
      console.error(error);
    }
  };




  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/profitgoalf')
  //     .then(response => {
  //       setFixedProfit(response.data);
  //       setRecurringProfit(response.data);
  //       setTotalProfit(Number(response.data[0].FResults) + Number(response.data[1].RResults));
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);


  console.log(data)
  return (
    <div className='home-tg-body'>
      <div className='home-tg-card'>
        <h1>Target Goal</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='net-profit-input'>Net Profit:</label>
          <input type='number' id='net-profit-input' value={netProfit} onChange={handleNetProfitChange} />
          <br />
          <button type='submit'>Add Profit Goal</button>
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
        {data.map((item, index) => (
          <div key={index}>
            <h3>Your Target Amount:</h3>
            <p>${item.netProfit}</p>
            <button type='button' onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))}
        <div>
          {/* <h3>Total Profit: ${totalProfit}</h3> */}
        </div>
      </div>
    </div>
  );
};

export default Targetgoal;
