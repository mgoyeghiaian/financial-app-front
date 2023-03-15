import Navbar from "../../../../components/Navbar";
import Profitgoal from "../../../../components/Profitgoal";
import Hero from "./Hero";
import Report from "./Report";
import Targetgoal from "./Targetgoal";
import "./Expenses.css";
import Popup from "../Popup/Popup";
import Editpopup from "../Popup/Editpopup";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function Input() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [category, setCategory] = useState("");
  const [deleteFixed, setdeleteFixed] = useState("");
  const [deleteRecurring, setdeleteRecurring] = useState("");
  const [updateFixed, setUpdateFixed] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [editpopup, setEditpopup] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [editCategory, setEditCategory] = useState("");

  let type = "expense";
  let fixed = "fixed";
  let recurring = "recurring";

  const handleSubmit = async (e) => {
    e.preventDefault();

    //to send data to backend

    if (category == fixed) {
      let body = JSON.stringify({
        title,
        type,
        amount,
        category,
        endDate: endDate,
        startDate: startDate,
      });

      console.log("body ", body);
      let res = fetch("http://127.0.0.1:8000/api/fixed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
      // window.location.reload();
    }

    if (category == recurring) {
      let body = JSON.stringify({
        title,
        type,
        amount,
        category,
        enddate: endDate,
        startdate: startDate,
      });

      let res = fetch("http://127.0.0.1:8000/api/recurring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
      window.location.reload();
    }
  };

  //to fetch data for fixed
  const [getfixed, setgetfixed] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/fixed");
        const data = await response.json();
        setgetfixed(data.message);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  //to fetch data for recurring

  const [getRecurring, setGetRecurring] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/recurring");
        const data = await response.json();
        setGetRecurring(data.message);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const editFixed = async (
    id,
    title,
    type,
    amount,
    category,
    enddate,
    startdate,
    _method
  ) => {
    try {
      let body = JSON.stringify({
        title,
        type,
        _method: "PATCH",
        amount,
        category,
        enddate: endDate,
        startdate: startDate,
      });
      console.log("body ", body);

      const response = await fetch(`http://127.0.0.1:8000/api/fixed/${id}`, {
        method: "POST",
        mode: "cors",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setUpdateFixed((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  //to delete data

  const deleteF = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/fixed/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setdeleteFixed((prev) => prev + 1);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteR = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/recurring/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setdeleteRecurring((prev) => prev + 1);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="expenses-body">
      <div className="expenses-left">
    <Navbar />
    </div>


      
      <form className="expenses-form" autoComplete="off" onSubmit={handleSubmit}>
        

        <div className="expense-form">
          <p>Type</p>
          <label htmlFor="title"></label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          ></input>
          <label htmlFor="amount"></label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="amount"
          ></input>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setstartDate(e.target.value)}
          ></input>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setendDate(e.target.value)}
          ></input>

          <label for="category"></label>

          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select an option</option>
            <option value={"fixed"}>Fixed</option>
            <option value={"recurring"}>Recurring</option>
          </select>

          <input className="add-btn" type="submit" value="Submit" />
        </div>

        <div>
          <tr className="report">
            {getfixed.map((item) => (
              <div className="td-within" key={item.id}>
                <td className="type">{item.type}</td>
                <td className="title">{item.title}</td>
                <td className="amount">{item.amount}</td>
                <td className="startDate">{item.startDate}</td>
                <td className="endDate">{item.endDate}</td>

                <td className="category">{item.category}</td>
                <td>
                  <button
                    className="popup-open"
                    onClick={() => setButtonPopup(true)}
                  >
                    X
                  </button>
                </td>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <div>
                    <button
                      className="delete"
                      onClick={() => deleteF(item["id"])}
                    >
                      Delete
                    </button>
                  </div>
                </Popup>
                <td>
                  <button className="edit" onClick={() => setEditpopup(true)}>
                    Edit
                  </button>
                </td>
                <Editpopup trigger={editpopup} setTrigger={setEditpopup}>
                  <div>
                    <button
                      className="edit-done"
                      onClick={() => editFixed(item["id"])}
                    >
                      Done
                    </button>
                  </div>
                </Editpopup>
              </div>
            ))}
          </tr>
        </div>

        <div>
          <tr className="report">
            {getRecurring.map((item) => (
              <div className="td-within" key={item.id}>
                <td className="type">{item.type}</td>
                <td className="title">{item.title}</td>
                <td className="amount">{item.amount}</td>
                <td className="startDate">{item.startDate}</td>
                <td className="endDate">{item.endDate}</td>

                <td className="category">{item.category}</td>
                <td>
                  <button
                    className="popup-open"
                    onClick={() => setButtonPopup(true)}
                  >
                    X
                  </button>
                </td>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> 
                  <div>
                    <button
                      className="delete"
                      onClick={() => deleteR(item["id"])}
                    >
                      Delete
                    </button>
                  </div>
                </Popup>
                <td>
                  <button className="edit" onClick={() => setEditpopup(true)}>
                    Edit
                  </button>
                </td>
                <Editpopup trigger={editpopup} setTrigger={setEditpopup}>
                  <div>
                    <button
                      className="edit-done"
                      onClick={() => editFixed(item["id"])}
                    >
                      Done
                    </button>
                  </div>
                </Editpopup>
              </div>
            ))}
          </tr>
        </div>

        
      </form>
    </div>
  );
}

export default Input;
