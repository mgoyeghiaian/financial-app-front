import React, { useEffect, useState } from "react";
import "./Editpopup.css";

function Editpopup(props) {
  console.log("props.id: ", props.id);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [category, setCategory] = useState("");
  const [deleteFixed, setdeleteFixed] = useState("");
  const [deleteRecurring, setdeleteRecurring] = useState("");
  const [updateFixed, setUpdateFixed] = useState("");

  // const editFun = () => {
  //   axios.post("API", {
  //     title,
  //     amount,
  //     startdate:startDate,
  //   });
  // };

  // const editRecurring = async (
  //   id,
  //   title,
  //   type,
  //   amount,
  //   category,
  //   enddate,
  //   startdate,
  //   _method
  // ) => {
  //   try {
  //     let body = JSON.stringify({
  //       title,
  //       amount,
  //       _method: "PATCH",
  //       category,
  //       enddate: endDate,
  //       startdate: startDate,
  //     });
  //     console.log("body pop", body);

  //     const response = await fetch(
  //       `http://localhost:8000/api/recurring/${id}`,
  //       {
  //         method: "PATCH",
  //         mode: "cors",
  //         body,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const result = await response.json();
  //     setUpdateFixed((prev) => prev + 1);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  async function editRecurring(id) {
    console.log("ID: ", id);
    const x = await fetch(`http://localhost:8000/api/recurring/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        amount,
        _method: "PATCH",
        category,
        enddate: endDate,
        startdate: startDate,
      }),
    });

    const response = await x.json();
    console.log(response);
  }


  useEffect(() => {
    editRecurring();
  },[])



  return props.trigger ? (
    <div className="edit-popup">
      <div className="editpopup-inner">
        <h1>Edit payment:</h1>
        <div className="edit-inputs">
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
            className="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select an option</option>
            <option value={"fixed"}>Fixed</option>
            <option value={"recurring"}>Recurring</option>
          </select>
        </div>

        <button className="edit-done" onClick={() => editRecurring(props.id)}>
          Done
        </button>

        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Cancel
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Editpopup;
