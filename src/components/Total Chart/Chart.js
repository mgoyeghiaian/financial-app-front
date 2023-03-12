import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Chart = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/fixed')
      .then(response => setData(response.data.message))
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const getYear = async (year) => {
      const res = await axios.get(`http://127.0.0.1:8000/api/fixed?year=${year}`);
      setData(res.data.message);
    };

    if (selectedYear) {
      getYear(selectedYear);
    }
  }, [selectedYear]);

  const formatData = () => {
    const monthlyData = [];
    const year = data.length ? new Date(data[0].created_at).getFullYear() : new Date().getFullYear();
    for (let i = 0; i < 12; i++) {
      const monthName = new Date(year, i).toLocaleString('default', { month: 'long' });
      const monthlyIncome = data.filter(item => item.type === 'income' && new Date(item.created_at).getFullYear() === year && new Date(item.created_at).getMonth() === i).reduce((acc, item) => acc + item.amount, 0);
      const monthlyExpense = data.filter(item => item.type === 'expense' && new Date(item.created_at).getFullYear() === year && new Date(item.created_at).getMonth() === i).reduce((acc, item) => acc + item.amount, 0);
      const monthlyResult = monthlyIncome - monthlyExpense;
      monthlyData.push({
        month: monthName,
        income: monthlyIncome,
        expense: monthlyExpense,
        result: monthlyResult
      });
    }
    return monthlyData;
  };

  const chartData = formatData();

  return (
    <>
      <div>
        <label htmlFor='year-input'>Select Year:</label>
        <select id='year-input' onChange={(e) => setSelectedYear(e.target.value)}>
          <option value=''>Select Year</option>
          <option value='2021'>2021</option>
          <option value='2022'>2022</option>
          <option value='2023'>2023</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <XAxis dataKey='month' />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#82ca9d" radius={50} />
          <Bar dataKey="expense" fill="#f44336" />
          <Bar dataKey="result" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
