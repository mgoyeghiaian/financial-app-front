import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
      setData(res.data.message.filter(item => new Date(item.created_at).getFullYear() === parseInt(year)));
    };

    if (selectedYear) {
      getYear(selectedYear);
    }
  }, [selectedYear]);
  const formatData = () => {
    if (!data.length) {
      return new Array(12).fill().map((_, i) => ({
        month: new Date(new Date().getFullYear(), i).toLocaleString('default', { month: 'long' }),
        income: 0,
        expense: 0,
        result: 0,
      }));
    }

    const monthlyData = [];
    const year = new Date(data[0].created_at).getFullYear();
    let totalPrevious = 0;

    for (let i = 0; i < 12; i++) {
      const monthName = new Date(year, i).toLocaleString('default', { month: 'long' });
      let monthlyIncome = 0;
      let monthlyExpense = 0;

      if (i <= new Date().getMonth()) {
        monthlyIncome = data
          .filter(
            (item) =>
              item.type === 'income' &&
              new Date(item.created_at).getFullYear() === year &&
              new Date(item.created_at).getMonth() === i
          )
          .reduce((acc, item) => acc + item.amount, 0) + totalPrevious;

        monthlyExpense = data
          .filter(
            (item) =>
              item.type === 'expense' &&
              new Date(item.created_at).getFullYear() === year &&
              new Date(item.created_at).getMonth() === i
          )
          .reduce((acc, item) => acc + item.amount, 0);

        totalPrevious = monthlyIncome - monthlyExpense;
      }

      const monthlyResult = monthlyIncome - monthlyExpense;

      monthlyData.push({
        month: monthName,
        income: monthlyIncome,
        expense: monthlyExpense,
        result: i <= new Date().getMonth() ? monthlyResult : null,
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
      {selectedYear ? (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={chartData}>
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="green" radius={8} />
            <Bar dataKey="expense" fill="red" radius={8} />
            <Bar dataKey="result" fill="blue" radius={8} />
            <Legend />

          </BarChart>
        </ResponsiveContainer>
      ) : (
        <h4>Please select a year to view data</h4>
      )}
    </>
  );
};

export default Chart;
