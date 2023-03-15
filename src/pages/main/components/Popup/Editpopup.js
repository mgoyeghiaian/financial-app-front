import React, {useState} from 'react'
import "./Editpopup.css"

function Editpopup(edit) {
     const [title, setTitle] = useState("");
     const [amount, setAmount] = useState("");
     const [startDate, setstartDate] = useState("");
     const [endDate, setendDate] = useState("");
     const [category, setCategory] = useState("");
     const [deleteFixed, setdeleteFixed] = useState("");
     const [deleteRecurring, setdeleteRecurring] = useState("");
     const [updateFixed, setUpdateFixed] = useState("");
   return edit.trigger ? (
     <div className="edit-popup">
       <div className="editpopup-inner">
         <h1>Edit payment:</h1>
         <div className='edit-inputs'>
           
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
         <button className="close-btn" onClick={() => edit.setTrigger(false)}>
           Cancel
         </button>
         {edit.children}
       </div>
     </div>
   ) : (
     ""
   );
}

export default Editpopup