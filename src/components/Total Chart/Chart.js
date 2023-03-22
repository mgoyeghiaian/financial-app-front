import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';

const Chart = () => {
  const [dataf, setDataf] = useState([]);
  const [datar, setDatar] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2023');
  useEffect(() => {
    const fetchData = async () => {
      const [fixedData, recurringData] = await Promise.all([
        axios.get(`https://backend-production-05ef.up.railway.app/api/fixed${selectedYear ? `?year=${selectedYear}` : ''}`),
        axios.get(`https://backend-production-05ef.up.railway.app/api/recurring${selectedYear ? `?year=${selectedYear}` : ''}`)
      ]);
      setDataf(fixedData.data.message.filter((item) => item.isDeleted === 0));
      setDatar(recurringData.data.message.filter((item) => item.isDeleted === 0));
    };

    fetchData();
  }, [selectedYear]);

  //to show all the months
  // Format data function
  const formatData = () => {
    const data = [...dataf, ...datar].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    const monthlyData = new Array(12).fill().map((_, i) => ({
      month: new Date(selectedYear, i).toLocaleString('default', { month: 'long' }),
      income: 0,
      expense: 0,
      result: 0,
    }));

    let totalPrevious = 0;
    ////////////////
    for (let i = 0; i < 12; i++) {
      const monthData = monthlyData[i];

      const dataExistsForMonth = data.some(
        (item) =>
          (item.type === 'income' || item.type === 'expense') &&
          new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
          new Date(item.endDate).getMonth() === i
      );

      if (dataExistsForMonth) {
        //  for income bar
        const monthlyIncome = data
          .filter(
            (item) =>
              item.type === 'income' &&
              new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
              new Date(item.endDate).getMonth() === i
          )
          .reduce((acc, item) => acc + parseFloat(item.amount), 0);

        //  for expense bar
        const monthlyExpense = -1 * data
          .filter(
            (item) =>
              item.type === 'expense' &&
              new Date(item.endDate).getFullYear() === parseInt(selectedYear) &&
              new Date(item.endDate).getMonth() === i
          )
          .reduce((acc, item) => acc + parseFloat(item.amount), 0);

        totalPrevious = totalPrevious + monthlyIncome + monthlyExpense;
        //  for result bar
        monthData.income = monthlyIncome;
        monthData.expense = monthlyExpense;
        monthData.result = totalPrevious;
      }
    }

    return monthlyData;
  };

  const chartData = formatData();
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

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value)

  }



  return (
    <>

      <div>
        <select id='year-input' value={selectedYear} onChange={handleYearChange}>
          <option value="">Select a year</option>
          {yearOptions}
        </select>
      </div>

      {selectedYear ? (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={chartData}>
            <XAxis dataKey='month' />
            <YAxis domain={['auto', 'auto']} />
            <CartesianGrid strokeDasharray="3 2" />
            <Tooltip />
            <Bar dataKey="income" fill="#3C763D" radius={8} />
            <Bar dataKey="expense" fill="#A94442" radius={8} />
            <Bar dataKey="result" fill="#31708F" radius={8} />
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
