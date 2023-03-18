import React from 'react'
import "./home.css"
import { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [fixedData, setFixedData] = useState([]);
  const [recurring, setREcurringData] = useState([]);

  useEffect(() => {
    getfixed()
  }, []);
  useEffect(() => {
    getrecurring()
  }, []);

  const getfixed = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/fixed")
    setFixedData(res.data.message.slice(-2));

  }

  console.log(fixedData)
  const getrecurring = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/recurring")
    setREcurringData(res.data.message.slice(-1));
  }
  console.log(recurring)

   
  return (
    <div className='home-report-body'>
      <div className='home-report-card'>
        <h3>Report</h3>
        {fixedData.map((item, index) => (
          <div className='home-report-data' key={index}>
            <p> {item.title} </p>
            <p style={{color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)'}}> {item.type} </p>
            <p style={{color: item.type === 'income' && item.category ==='recurring' ? 'rgb(0 189 211)' : 'black'}}> {item.category}</p>
            <p style={{color: item.type === 'income' && item.category ==='recurring' ? 'rgb(0 189 211)' : 'black'}}> {item.amount}$</p>
          </div>

        ))}
        {
          recurring.map((item, index) => (
            <div className='home-report-data' key={index}>
              <p>{item.title} </p>
              <p style={{color: item.type === 'expense' ? 'red' : 'rgb(0 189 211)'}}>{item.type} </p>
              <p style={{color: item.type === 'income' && item.category ==='recurring' ? 'rgb(0 189 211)' : 'red'}}>{item.category}</p>
              <p style={{color: item.type === 'expense' && item.category ==='recurring' ? 'red' : 'black'}}>{item.amount}$</p>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default Report