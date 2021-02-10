import React, { useState, useEffect } from "react";
import useValidation from "../../hooks/useValidation";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.scss";
import TicketCard from "../../components/TicketCard";
import EditModal from "../../components/EditModal";
import AddModal from "../../components/AddModal";
import offImg from "../../assets/off.svg";
import { Ticket } from "../../interfaces/Ticket";

const Dashboard: React.FC = () => {
  useValidation();
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [tickets, setTickets] = useState<[Ticket]>();
  const [currentTicket, setCurrentTicket] = useState<Ticket>();

  useEffect(() => {
    (async () => {
      let token = localStorage.getItem("@jwt");
      let response = await fetch("http://3.137.211.94:5000/v1/travel", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      let parsedResponse = await response.json();
      setTickets(parsedResponse);
    })();
  }, []);

  async function deleteTicket(id: string) {
    let token = localStorage.getItem("@jwt");
    let response = await fetch(`http://3.137.211.94:5000/v1/travel/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.status === 204) {
      alert("Ticket Deleted!");
      window.location.reload();
    } else {
      alert("Server Error!");
    }
  }

  function logout() {
    localStorage.removeItem("@jwt");
    history.push("/");
  }

  function openEditModalHandle(t: Ticket) {
    setCurrentTicket(t);
    setOpenEditModal(true);
  }

  return (
    <div className={styles.container}>
      {openModal && <AddModal closeModal={setOpenModal} />}
      {openEditModal && (
        <EditModal
          id={currentTicket!.id}
          comments={currentTicket!.comments}
          destination={currentTicket!.destination}
          endDate={currentTicket!.endDate}
          source={currentTicket!.source}
          startDate={currentTicket!.startDate}
          closeModal={setOpenEditModal}
        />
      )}
      <div className={styles.contentDiv}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Tickets</h1>
          <div className={styles.logoutDiv}>
            <img
              src={offImg}
              alt="logout"
              style={{ width: "1.75rem" }}
              onClick={logout}
            />
          </div>
        </div>

        <div className={styles.ticketsList}>
          {tickets?.map((ticket) => {
            return (
              <TicketCard
                key={ticket.id}
                id={ticket.id}
                source={ticket.source}
                destination={ticket.destination}
                startDate={ticket.startDate}
                endDate={ticket.endDate}
                comments={ticket.comments}
                deleteTicket={deleteTicket}
                openEditModal={openEditModalHandle}
              />
            );
          })}
        </div>

        <div className={styles.addBtnDiv}>
          <button className={styles.addBtn} onClick={() => setOpenModal(true)}>
            Add ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
