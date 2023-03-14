import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';

const Chart = () => {
  const [dataf, setDataf] = useState([]);
  const [datar, setDatar] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fixedData, recurringData] = await Promise.all([
          axios.get(`http://localhost:8000/api/fixed${selectedYear ? `?year=${selectedYear}` : ''}`),
          axios.get(`http://localhost:8000/api/recurring${selectedYear ? `?year=${selectedYear}` : ''}`)
        ]);
        setDataf(fixedData.data.message);
        setDatar(recurringData.data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedYear]);
  const formatData = () => {
    const data = [...dataf, ...datar];

    const monthlyData = new Array(12).fill().map((_, i) => ({
      month: new Date(selectedYear, i).toLocaleString('default', { month: 'long' }),
      income: 0,
      expense: 0,
      result: 0,
    }));

    let totalPrevious = 0;

    for (let i = 0; i < 12; i++) {
      const monthData = monthlyData[i];

      const dataExistsForMonth = data.some(
        (item) =>
          (item.type === 'income' || item.type === 'expense') &&
          new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
          new Date(item.endDate).getMonth() === i
      );

      if (dataExistsForMonth) {
        const monthlyIncome = data
          .filter(
            (item) =>
              item.type === 'income' &&
              new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
              new Date(item.endDate).getMonth() === i
          )
          .reduce((acc, item) => acc + parseFloat(item.amount), 0) + totalPrevious;

        const monthlyExpense = data
          .filter(
            (item) =>
              item.type === 'expense' &&
              new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
              new Date(item.endDate).getMonth() === i
          )
          .reduce((acc, item) => acc + parseFloat(item.amount), 0);

        totalPrevious = monthlyIncome - monthlyExpense;

        const monthlyResult = monthlyIncome - monthlyExpense;

        monthData.income = monthlyIncome;
        monthData.expense = monthlyExpense;
        monthData.result = monthlyResult;
      }
    }

    return monthlyData;
  };
  const chartData = formatData();

  return (
    <>
      <div>
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
            <CartesianGrid strokeDasharray="3 2" />
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
