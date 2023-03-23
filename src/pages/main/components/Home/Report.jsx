import React from 'react';
import "./home.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [reportData, setreportData] = useState([]);
  const [selectValue, setselectValue] = useState('fixed');

  useEffect(() => {
    const getReport = async () => {
      let resp;
      if (selectValue === 'fixed') {
        resp = await axios.get("https://backend-production-05ef.up.railway.app/api/fixed")
      }
      if (selectValue === 'recurring') {
        resp = await axios.get("https://backend-production-05ef.up.railway.app/api/recurring")
      }
      // const report = res.data.message.slice(-3).filter((item) => item.isDeleted === 0);
      const report = resp.data.message.slice(-3).filter((item) => item.isDeleted === 0);
      setreportData(report.reverse());
      console.log(resp);
    }
    getReport();
  },
    [selectValue]);



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
        {selectValue ? (

          reportData.map((item, index) => (
            <div className='home-report-data' key={index}>
              <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.title} </p>
              <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.type} </p>
              <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.category}</p>
              <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.amount}$</p>
            </div>

          ))

        ) : (
          <h4 className='h4-tgcard'>Please select a type to see the data.</h4>
        )}
      </div>
    </div>

  )
}

export default Report;
