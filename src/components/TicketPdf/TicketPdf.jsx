import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import styles from "./TicketPdf.module.css";
import jsPDF from "jspdf";
import logo from "../../Utilities/logoProvi.png";

const TicketPdf = () => {
  // const API = 'https://event-henryapp-backend.herokuapp.com/api/'
  const API = "http://localhost:3001/api/";
  // const ID = 'd123cf7a-e1f7-4e21-b425-7f905ade9954'
  const props = useRouteMatch();
  const ID = props.params.id;

  const [Ticket, setTicket] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      const ticket = await axios.get(`${API}ticket/${ID}`);

      setTicket(ticket.data);
    };
    fetchTickets();
  }, [setTicket]);

  let date = [];
  !Ticket.date ? (date = ["00", "00", "00"]) : (date = Ticket.date.split("-"));

  //funciones
  const createPdf = () => {
    let doc = new jsPDF("p", "pt", "a4");
    doc.addImage(logo, "PNG", 0, 0, 600, 200);
    //  doc.addPage()
    doc.setFont("Courier New", "bold");
    doc.setFontSize(30);
    doc.text(50, 230, Ticket.nameEvent);
    doc.setFont("Courier", "normal");
    doc.setFontSize(20);
    doc.text(50, 270, `Dirección: ${Ticket.direction}`);
    doc.text(50, 310, `Total: ${Ticket.total}`);
    doc.text(50, 350, `Asientos: ${Ticket.seating.map((e) => (
      e
    ))}`);
    doc.save(`Ticket para: ${Ticket.nameEvent}/Event.pdf`);
  };

  return (
    <div id="content">
      <div className={styles.subContainer}>
        <h3 className={styles.title}>{Ticket.nameEvent}</h3>
        <p>{`${date[2]}/${date[1]}/${date[0]}`}</p>
        {!Ticket.schedule ? (
          <h4>Sin Horario</h4>
        ) : (
          <ul>
            {Ticket.schedule.map((e) => (
              <li key={e}>{e} hrs</li>
            ))}
          </ul>
        )}
        <p>{Ticket.direction}</p>
      </div>
      <p>Propietario(a): {Ticket.nameUser}</p>
      <div className={styles.subContainerTwo}>
        <p className={styles.p}>Entradas:</p>
        <p className={styles.p}>{Ticket.quantity}</p>
        <p className={styles.p}>Precio unitario:</p>
        <p className={styles.p}>{Ticket.price}</p>
        <p className={styles.p}>Total: {Ticket.total}</p>
      </div>
      <div>
        {!Ticket.seating ? (
          <h4>Sin Asientos</h4>
        ) : (
          <ul className={styles.ul}>
            {Ticket.seating.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={createPdf} type="primary">
        PDF
      </button>
    </div>
  );
};

export default TicketPdf;
