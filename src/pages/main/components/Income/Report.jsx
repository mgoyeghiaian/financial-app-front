import React, { useState, useEffect } from "react";
import Popup from "./Popup/Popup";
import Editpopup from "./Popup/Editpopup";
import axios from "axios";
const Report = () => {
  const [title, setTitle] = useState([]);
  const [amount, setAmount] = useState([]);
  const [startdate, setstartDate] = useState([]);
  const [enddate, setendDate] = useState([]);
  const [category, setCategory] = useState([]);
  const [deleteFixed, setdeleteFixed] = useState([]);
  const [deleteRecurring, setdeleteRecurring] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [editpopup, setEditpopup] = useState(false);

  const [editPopupId, setEditPopupId] = useState(null);

  let type = "income";
  // let fixed = "fixed";
  // let recurring = "recurring";

  const handleSubmit = async (e) => {
    e.preventDefault();

    //to send data to backend

    if (category === "fixed") {
      let body = JSON.stringify({
        title,
        type,
        amount,
        category,
        enddate,
      });

      let res = fetch("http://127.0.0.1:8000/api/fixed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
    }

    if (category === "recurring") {
      let body = JSON.stringify({
        title,
        type,
        amount,
        category,
        enddate,
        startdate,
      });
      console.log("body ", body);
      let res = fetch("http://127.0.0.1:8000/api/recurring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
    }
  };

  //to fetch data for fixed
  const [getfixed, setgetfixed] = useState([]);

  const fetchDataFixed = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/fixed");
      const data = await response.json();
      setgetfixed(data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchDataRecurring = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/recurring");
      const data = await response.json();
      setGetRecurring(data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  //to fetch data for recurring
  const [getRecurring, setGetRecurring] = useState([]);
  useEffect(() => {
    fetchDataFixed();
    fetchDataRecurring();
  }, []);
  // delete Fixed Part

  const deleteF = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/fixed/${editPopupId}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setdeleteFixed((prev) => prev + 1);
      setEditPopupId(null);
      fetchDataFixed();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Recurring Part
  const deleteR = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/recurring/${editPopupId}`,
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
      setEditPopupId(null);
      fetchDataRecurring();
    } catch (error) {
      console.log(error);
    }
  };

  const editPopFn = (e) => {
    setButtonPopup(true);
    setEditPopupId(e.target.value);
    console.log("editpopup ", e.target.value);
  };

  return (
    // InPut Section
    <div className="in-report-body">
      <div className="in-report-card">
        <form
          className="income-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="input-form">
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
              value={startdate}
              onChange={(e) => setstartDate(e.target.value)}
            ></input>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              value={enddate}
              onChange={(e) => setendDate(e.target.value)}
            ></input>
            <label for="category"></label>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select an option</option>
              <option value="fixed">Fixed</option>
              <option value="recurring">Recurring</option>
            </select>
            <button className="add-btn" type="submit" value="Submit">
              Add
            </button>
          </div>
        </form>
        {/* Fixed Part */}
        <div>
          <tr className="report">
            {getfixed.map((item, index) => (
              <div className="td-within" key={index}>
                <td className="type">{item.type}</td>
                <td className="title">{item.title}</td>
                <td className="amount">{item.amount}</td>
                <td className="startDate">{item.startDate}</td>
                <td className="endDate">{item.endDate}</td>
                <td className="category">
                  {item.category} {item.id}
                </td>
                <div>
                  <td>
                    <button
                      className="popup-open"
                      value={item.id}
                      onClick={(e) => editPopFn(e)}
                    >
                      X
                    </button>
                  </td>
                  <Popup
                    trigger={buttonPopup}
                    setTrigger={setButtonPopup}
                    item={item.id}
                  >
                    <div>
                      <button
                        value={item.id}
                        className="delete"
                        onClick={(e) => deleteF(e)}
                      >
                        Delete
                      </button>
                    </div>
                  </Popup>
                </div>
                <td>
                  <button className="edit" onClick={() => setEditpopup(true)}>
                    Edit
                  </button>
                </td>
                <Editpopup trigger={editpopup} setTrigger={setEditpopup}>
                  <div></div>
                </Editpopup>
              </div>
            ))}
          </tr>
        </div>
        {/* Recurring Part */}
        <div>
          <tr className="report">
            {getRecurring.map((item, index) => (
              <div className="td-within" key={index}>
                <td className="type">{item.type}</td>
                <td className="title">{item.title}</td>
                <td className="amount">{item.amount}</td>
                <td className="startDate">{item.startDate}</td>
                <td className="endDate">{item.endDate}</td>
                <td className="category">
                  {item.category} {item.id}
                </td>
                <div>
                  <td>
                    <button
                      className="popup-open"
                      value={item.id}
                      onClick={(e) => editPopFn(e)}
                    >
                      X
                    </button>
                  </td>
                  <Popup
                    trigger={buttonPopup}
                    setTrigger={setButtonPopup}
                    item={item.id}
                  >
                    <div>
                      <button
                        value={item.id}
                        className="delete"
                        onClick={(e) => deleteR(e)}
                      >
                        Delete
                      </button>
                    </div>
                  </Popup>
                </div>
                <td>
                  <button className="edit" onClick={() => setEditpopup(true)}>
                    EditsetButtonPopup
                  </button>
                </td>

                <Editpopup
                  id={item["id"]}
                  trigger={editpopup}
                  setTrigger={setEditpopup}
                ></Editpopup>
              </div>
            ))}
          </tr>
        </div>
      </div>
    </div>
  );
};

export default Report;
