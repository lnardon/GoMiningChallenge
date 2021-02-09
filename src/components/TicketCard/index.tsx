import React from "react";

import styles from "./styles.module.scss";
import closeImg from "../../assets/close.svg";
import editImg from "../../assets/edit.svg";

interface Ticket {
  ticketId: string;
  comment: string;
  destination: string;
  endDate: string;
  source: string;
  startDate: string;
}
interface TicketInfo {
  ticketId: string;
  comment: string;
  destination: string;
  endDate: string;
  source: string;
  startDate: string;
  deleteTicket: (id: string) => void;
  openEditModal(ticket: Ticket): void;
}

const TicketCard: React.FC<TicketInfo> = ({
  source,
  destination,
  startDate,
  endDate,
  ticketId,
  comment,
  deleteTicket,
  openEditModal,
}) => {
  return (
    <div className={styles.container}>
      <h1>{`${destination}`}</h1>
      <h1>{startDate}</h1>
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
              ticketId,
              comment,
            })
          }
        />
        <img
          src={closeImg}
          alt="close"
          className={styles.actionBtn}
          onClick={() => deleteTicket(ticketId)}
        />
      </div>
    </div>
  );
};

export default TicketCard;
