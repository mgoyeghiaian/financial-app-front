import React from 'react';
import "./home.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [reportData, setreportData] = useState([]);
  const [selectValue, setselectValue] = useState('');
  useEffect(() => {
    getReport();
  }, [selectValue]);


  const getReport = async () => {
    let res;
    if (selectValue === 'fixed') {
      res = await axios.get("http://127.0.0.1:8000/api/fixed")
    }
    if (selectValue === 'recurring') {
      res = await axios.get("http://127.0.0.1:8000/api/recurring")
    }
    const reportData = res.data.message.slice(-3).filter((item) => item.isDeleted === 0);
    setreportData(reportData.reverse());
  }

  console.log(reportData)


  return (
    <div className='home-report-body'>
      <div className='home-report-card'>
        <div className='report-select'>
          <label htmlFor='report-type'></label>
          <select id='year-input' value={selectValue} onChange={(e) => setselectValue(e.target.value)}>
            <option value=''>Select Report Type</option>
            <option value='fixed'>Fixed</option>
            <option value='recurring'>Recurring</option>
          </select>
        </div>
        {reportData.map((item, index) => (
          <div className='home-report-data' key={index}>
            <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.title} </p>
            <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.type} </p>
            <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.category}</p>
            <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.amount}$</p>
          </div>

        ))}
      </div>
    </div >

  )
}

export default Report;
