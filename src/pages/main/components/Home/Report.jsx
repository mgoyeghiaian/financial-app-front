import React from 'react';
import "./home.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [reportData, setreportData] = useState([]);

  useEffect(() => {
    getReport();
  }, []);


  const getReport = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/report")
    const reportData = res.data.message.slice(-3).filter((item) => item.isDeleted === 0);
    setreportData(reportData.reverse());
  }

  console.log(reportData)


  return (
    <div className='home-report-body'>
      <div className='home-report-card'>
        <h3>Report</h3>
        {reportData.map((item, index) => (
          <div className='home-report-data' key={index}>
            <p> {item.title} </p>
            <p style={{ color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)' }}> {item.type} </p>
            <p style={{ color: item.type === 'income' ? 'rgb(0 189 211)' : 'black' }}> {item.category}</p>
            <p style={{ color: item.type === 'income' ? 'rgb(0 189 211)' : 'black' }}> {item.amount}$</p>
          </div>

        ))}
      </div>
    </div>

  )
}

export default Report;
