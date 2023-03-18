import React from "react";
import "./Popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h1>Are you sure you want to delete this payment?</h1>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Cancel
        </button>
        {props.children} {console.log("popup ", props.item)}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
