import { useState, useEffect } from "react";
import axios from "axios";
import '../Income/income.css'
const Report = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState([]);
  const [startdate, setstartDate] = useState([]);
  const [enddate, setendDate] = useState([]);
  const [category, setCategory] = useState('');
  const [isdeleted, setIsDeleted] = useState(0)
  const [type, setType] = useState('expense')


  const [RecurringData, setRecurringData] = useState([]);
  const [fixedData, setfixedData] = useState([]);
  // const [showConfirmation, setShowConfirmation] = useState(false);


  //to Post The data to backend


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === 'fixed') {
      await axios.post('https://backend-production-05ef.up.railway.app/api/fixed', {
        title, amount, enddate, isdeleted, category, type
      })

      await axios.post('https://backend-production-05ef.up.railway.app/api/report', {
        amount, isdeleted, category, type, title
      })
      setIsDeleted(false);
      setType('expense')
      getfixed();
    }

    if (category === "recurring") {
      await axios.post('https://backend-production-05ef.up.railway.app/api/recurring', {
        title, amount, startdate, enddate, isdeleted, category, type
      })

      await axios.post('https://backend-production-05ef.up.railway.app/api/report', {
        title, amount, startdate, enddate, isdeleted, category, type
      })
      setIsDeleted(false);
      setType('expense')
      getRecurring();
    }
    setTitle('');
    setAmount('');
    setstartDate('');
    setendDate('');
    setCategory('');
  };


  //to fetch data 

  useEffect(() => {
    getfixed();
    getRecurring();
  }, []);


  const getfixed = async () => {
    const res = await axios.get("https://backend-production-05ef.up.railway.app/api/fixed")
    setfixedData(res.data.message.filter(item => item.type === 'expense' && item.isDeleted === 0));
  }



  const getRecurring = async () => {
    const res = await axios.get("https://backend-production-05ef.up.railway.app/api/recurring")
    setRecurringData(res.data.message.filter(item => item.type === 'expense' && item.isDeleted === 0));
  }


  // delete Fixed & Recurring Part
  const handleDelete = async (category, id) => {
    if (category === 'fixed') {
      await axios.delete(`https://backend-production-05ef.up.railway.app/api/fixed/${id}`);
      getfixed();
    } else if (category === 'recurring') {
      await axios.delete(`https://backend-production-05ef.up.railway.app/api/recurring/${id}`);
      getRecurring();
    }

  };


  return (
    // InPut Section
    <div className="in-report-body">
      <div className="in-report-card">
        <div className="income-ex-input">
          <form
            className="income-form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <label htmlFor="title"> Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              ></input></label>
            <label htmlFor="amount">Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="amount"
              ></input></label>

            <label htmlFor="startDate">Start Date:
              <input
                type="date"
                value={startdate}
                onChange={(e) => setstartDate(e.target.value)}
              ></input></label>
            <label htmlFor="endDate">End Date:
              <input
                type="date"
                value={enddate}
                onChange={(e) => setendDate(e.target.value)}
              ></input></label>
            <label htmlFor="category">  Category:
              <select
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Select Category</option>
                <option value="fixed">Fixed</option>
                <option value="recurring">Recurring</option>
              </select></label>
            <button className="add-btn" type="submit" value="Submit">
              Add
            </button>
          </form>
        </div>
        {/* data Mapping Section */}
        <div className="inc-ex-data">
          {/* Fixed Part */}
          <div id="tbl-hd">
            <h3>Type</h3>
            <h3>Title</h3>
            <h3>Amount</h3>
            <h3>Start-Date</h3>
            <h3>End-Date</h3>
            <h3>Category</h3>
          </div>
          {fixedData.map((item, index) => (
            <div key={index}>
              <h3>{item.type}</h3>
              <h3>{item.title}</h3>
              <h3>{item.amount}</h3>
              <h3>{item.startDate}</h3>
              <h3>{item.endDate}</h3>
              <h3>
                {item.category}
              </h3>
              <button type="button" id="deleteF" onClick={() => handleDelete(item.category, item.id)}>Delete</button>
            </div>

          ))}

          {/* Recurring Part */}
          {RecurringData.map((item, index) => (
            <div key={index}>
              <h3>{item.type}</h3>
              <h3>{item.title}</h3>
              <h3>{item.amount}</h3>
              <h3>{item.startDate}</h3>
              <h3>{item.endDate}</h3>
              <h3>
                {item.category}
              </h3>
              <button type="button" id="deletR" onClick={() => handleDelete(item.category, item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
