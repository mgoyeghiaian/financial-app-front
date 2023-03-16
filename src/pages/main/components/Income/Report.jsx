import { useEffect, useState } from "react";
import axios from "axios";

const Report = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [getRecurring, setGetRecurring] = useState([]);
  const [getFixed, setGetFixed] = useState([]);

  let type = "income";

  // To send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category == "recurring") {
      await axios.post("http://127.0.0.1:8000/api/recurring", {
        title,
        amount,
        startdate,
        enddate,
        type,
        category,
      });
      fetchRecurring();
    }

    if (category == "fixed") {
     
        await axios.post("http://127.0.0.1:8000/api/fixed", {
          title,
          amount,
          enddate,
          type,
          category,
        });
      fetchFixed();
    }
  };

  // to fetech data

  const fetchRecurring = () => {
    axios.get("http://127.0.0.1:8000/api/recurring").then((res) => {
      setGetRecurring(res.data.message);
    });
  };

  const fetchFixed = () => {
    axios.get("http://127.0.0.1:8000/api/fixed").then((res) => {
      setGetFixed(res.data.message);
    });
  };

  const deleteFix = async (id, e) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8000/api/fixed/${id}`);
    fetchFixed();
  
  };
  const deleteRec = async (id, e) => {
    e.preventDefault();
    
      await axios.delete(
        `http://localhost:8000/api/recurring/${id}`
      );
    fetchRecurring();
   
  };
  useEffect(() => {
    fetchRecurring();
    fetchFixed();
  }, []);

  return (
    // InPut Section
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          type="text"
        ></input>

        <label>Amount</label>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>

        <label>Start-date</label>
        <input
          type="date"
          value={startdate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>

        <label>End-date</label>
        <input
          type="date"
          value={enddate}
          onChange={(e) => setEndDate(e.target.value)}
        ></input>

        <label>Category</label>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select an option</option>
          <option value="fixed"> Fixed</option>
          <option value="recurring">Recurring</option>
        </select>

        <button type="submit" value="submit">
          Add
        </button>
      </form>
     
      {/* Recurring Part */}
      <div className="report">
        {getRecurring.map((item, index) => (
          <div className="td-within" key={index}>
            <div className="type">{item.type}</div>
            <div className="title">{item.title}</div>
            <div className="amount">{item.amount}</div>
            <div className="startDate">{item.startDate}</div>
            <div className="endDate">{item.endDate}</div>
            <div className="category">{item.category}</div>
            <button value={item.id} onClick={(e) => deleteRec(item.id, e)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="report">
        {getFixed.map((data, index) => (
          <div className="td-within" key={index}>
            <div className="type">{data.type}</div>
            <div className="title">{data.title}</div>
            <div className="amount">{data.amount}</div>
            <div className="startDate">{data.startDate}</div>
            <div className="endDate">{data.endDate}</div>
            <div className="category">{data.category}</div>
            <button value={data.id} onClick={(e) => deleteFix(data.id, e)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
