import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
import styles from "./TicketPdf.module.css";
import jsPDF from "jspdf";
import logo from "../../Utilities/logoProvi.png";

const TicketPdf = () => {
  const API = "https://event-henryapp-backend.herokuapp.com/api/";
  // const API = "http://localhost:3001/api/";
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
    doc.setFontSize(40);
    doc.text(Ticket.nameEvent, 300, 270, "center" );
    doc.setFont("Courier", "normal");
    doc.setFontSize(20);
    doc.text(`${date[2]}/${date[1]}/${date[0]}`, 300, 330, "center");
    doc.text(`${Ticket.schedule.map((e) => e)}Hrs`, 300, 360, "center");
    doc.text(`${Ticket.direction}`, 300, 390, "center");
    doc.text( `${Ticket.nameUser}`, 300, 440, "center");
    doc.text(`Entradas: ${Ticket.quantity}`, 300, 470, "center");
    doc.text(`Precio: ${Ticket.price}`, 300, 510, "center");
    doc.text(`Total: ${Ticket.total}`, 300, 550, "center");
    doc.text(`${Ticket.seating.map((e) => e)}`, 300, 590, "center");
    doc.setFont("Courier New", "bold");
    doc.setFontSize(15);
    doc.text(300, 810, Ticket.id);
    doc.save(`Event-${Ticket.nameEvent}-${date[2]}/${date[1]}/${date[0]}.pdf`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <img src={logo} alt="" className={styles.img} />
        <div className={styles.containerData}>
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

          <p>{Ticket.nameUser}</p>
          <p className={styles.p}>Entradas:</p>
          <p className={styles.p}>{Ticket.quantity}</p>
          <p className={styles.p}>Precio unitario:</p>
          <p className={styles.p}>{Ticket.price}</p>
          <p className={styles.p}>Total: {Ticket.total}</p>
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
        </div>

        <p className={styles.id}>{Ticket.id}</p>
      </div>
      <button className={styles.btn} onClick={createPdf} type="primary">
        DESCARGA
      </button>
    </div>
  );
};

export default TicketPdf;
