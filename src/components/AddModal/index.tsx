import React, { useState } from "react";

import styles from "./styles.module.scss";
import closeImg from "../../assets/close.svg";

interface Modal {
  closeModal(state: boolean): void;
}

const AddModal: React.FC<Modal> = ({ closeModal }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comments, setComments] = useState("");

  const createTicket = async () => {
    let token = localStorage.getItem("@jwt");
    let response = await fetch("http://3.137.211.94:5000/v1/travel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        source,
        destination,
        startDate,
        endDate,
        comments,
      }),
    });
    if (response.status === 201) {
      alert("Ticket Created!");
      window.location.reload();
    } else {
      alert("Server Error!");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <img
          src={closeImg}
          alt="Close"
          className={styles.closeBtn}
          onClick={() => closeModal(false)}
        />
        <h1 className={styles.title}>Create ticket</h1>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="source">
            Origin:
          </label>
          <input
            placeholder="La Guardia"
            className={styles.input}
            type="text"
            onChange={(e) => setSource(e.target.value)}
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
            onChange={(e) => setDestination(e.target.value)}
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
            onChange={(e) => setStartDate(e.target.value)}
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
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className={styles.inputDiv}>
          <label className={styles.inputLabel} htmlFor="comment">
            Comment:
          </label>
          <input
            placeholder="Eat at Joe's Pub"
            className={styles.input}
            type="text"
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button className={styles.btn} onClick={createTicket}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AddModal;
