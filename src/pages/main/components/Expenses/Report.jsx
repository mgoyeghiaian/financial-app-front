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
  const [admin_id, setAdmin_id] = useState(1)
  const [type, setType] = useState('expense')


  const [RecurringData, setRecurringData] = useState([]);
  const [fixedData, setfixedData] = useState([]);
  // const [showConfirmation, setShowConfirmation] = useState(false);


  //to Post The data to backend


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === "fixed") {
      await axios.post('http://127.0.0.1:8000/api/fixed', {
        title, amount, enddate, admin_id, isdeleted, category, type
      })
      setIsDeleted(false);
      setAdmin_id(1);
      setType('income')
      getfixed();

    }

    if (category === "recurring") {
      await axios.post('http://127.0.0.1:8000/api/recurring', {
        title, amount, startdate, enddate, admin_id, isdeleted, category, type
      })
      setIsDeleted(false);
      setAdmin_id(1);
      setType('income')
      getRecurring();

    }
  };



  //to fetch data 

  useEffect(() => {
    getfixed();
    getRecurring();
  }, []);


  const getfixed = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/fixed")
    setfixedData(res.data.message.filter(item => item.type === 'expense'));
  }



  const getRecurring = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/recurring")
    setRecurringData(res.data.message.filter(item => item.type === 'expense'));
  }


  // delete Fixed & Recurring Part
  const handleDelete = async (id) => {
    // setShowConfirmation(true);
    await axios.delete(`http://127.0.0.1:8000/api/fixed/${id}`);
    await axios.delete(`http://127.0.0.1:8000/api/recurring/${id}`);
    getfixed();
    getRecurring();
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
                <option>Select Category</option>
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
              <button type="button" onClick={() => handleDelete(item.id)}>Delete</button>
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
              <button type="button" onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;
