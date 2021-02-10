import React from "react";

import styles from "./styles.module.scss";
import closeImg from "../../assets/close.svg";
import editImg from "../../assets/edit.svg";
import { Ticket } from "../../interfaces/Ticket";
interface TicketCardInfo extends Ticket {
  deleteTicket: (id: string) => void;
  openEditModal(ticket: Ticket): void;
}

//interface IFooBar extends IFoo

const TicketCard: React.FC<TicketCardInfo> = ({
  source,
  destination,
  startDate,
  endDate,
  id,
  comments,
  deleteTicket,
  openEditModal,
}) => {
  function formatDate(date: string) {
    let formatedDate = "";
    formatedDate += date.substring(8, 10) + "/";
    formatedDate += date.substring(5, 7) + "/";
    formatedDate += date.substring(0, 4);
    return formatedDate;
  }

  return (
    <div className={styles.container}>
      <div className={styles.ticketInfo}>
        <h4 className={styles.date}>{formatDate(startDate)}</h4>
        <h1 className={styles.title}>{`${destination}`}</h1>
      </div>
      <div className={styles.btnsDiv}>
        <img
          src={editImg}
          alt="edit"
          className={styles.actionBtn}
          onClick={() =>
            openEditModal({
              source,
              destination,
              startDate,
              endDate,
              id,
              comments,
            })
          }
        />
        <img
          src={closeImg}
          alt="close"
          className={styles.actionBtn}
          onClick={() => deleteTicket(id)}
          style={{ marginLeft: "2rem" }}
        />
      </div>
    </div>
  );
};

export default TicketCard;
