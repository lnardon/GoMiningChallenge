import React, { useState } from "react";

import styles from "./styles.module.scss";
import closeImg from "../../assets/close.svg";
import { Ticket } from "../../interfaces/Ticket";

interface EditProps extends Ticket {
  closeModal(state: boolean): void;
}

const EditModal: React.FC<EditProps> = ({
  id,
  comments,
  destination,
  endDate,
  source,
  startDate,
  closeModal,
}) => {
  const [sourceEdit, setSourceEdit] = useState(source);
  const [destinationEdit, setDestinationEdit] = useState(destination);
  const [startDateEdit, setStartDateEdit] = useState(startDate);
  const [endDateEdit, setEndDateEdit] = useState(endDate);
  const [commentsEdit, setCommentsEdit] = useState(comments);

  const editTicket = async () => {
    let token = localStorage.getItem("@jwt");
    let response = await fetch("http://3.137.211.94:5000/v1/travel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: id,
        source: sourceEdit,
        destination: destinationEdit,
        startDate: startDateEdit,
        endDate: endDateEdit,
        comments: commentsEdit,
      }),
    });
    console.log(response);
    if (response.status === 200) {
      alert("Ticket edited!");
      window.location.reload();
    } else {
      alert("Server Error!");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Edit ticket</h1>
        <img
          src={closeImg}
          alt="Close"
          className={styles.closeBtn}
          onClick={() => closeModal(false)}
        />
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="source">
            Origin:
          </label>
          <input
            placeholder="La Guardia"
            className={styles.input}
            type="text"
            onChange={(e) => setSourceEdit(e.target.value)}
            value={sourceEdit}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="destination">
            Destination:
          </label>
          <input
            placeholder="Delaware"
            className={styles.input}
            type="text"
            onChange={(e) => setDestinationEdit(e.target.value)}
            value={destinationEdit}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="start">
            Start Date:
          </label>
          <input
            placeholder="2021-01-01"
            className={styles.input}
            type="text"
            onChange={(e) => setStartDateEdit(e.target.value)}
            value={startDateEdit}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="end">
            End Date:
          </label>
          <input
            placeholder="2021-01-07"
            className={styles.input}
            type="text"
            onChange={(e) => setEndDateEdit(e.target.value)}
            value={endDateEdit}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="comment">
            Comments:
          </label>
          <input
            placeholder="Eat at Joe's Pub"
            className={styles.input}
            type="text"
            onChange={(e) => setCommentsEdit(e.target.value)}
            value={commentsEdit}
          />
        </div>
        <button className={styles.btn} onClick={editTicket}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditModal;
