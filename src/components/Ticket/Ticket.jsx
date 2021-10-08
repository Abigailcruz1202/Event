import React from "react";
import {Link} from 'react-router-dom';
import styles from "./Ticket.module.css";
import moment from "moment";
import "moment/locale/es";

const Ticket = ({ ticket }) => {
  moment.locale("es");
  const date = ticket.date.split("-");
  const today = moment();
  const day = moment(ticket.date);
  console.log(today, day);

  return (
    <>
      {today.format("L") === day.format("L") ? (
        <div className={styles.today}>
          <h4>Hoy</h4>
          <h5>El gran dia</h5>
        </div>
      ) : (
        <>
          {today < day ? (
            <div className={styles.prox}>
              <h4>Proximamente</h4>
              <h5>{moment(day).endOf('hour').fromNow()}</h5>
            </div>
          ) : (
            <div className={styles.ocur}>
              <h4>Ocurrido</h4>
              <h5>{moment(day).endOf('hour').fromNow()}</h5>
            </div>
          )}
        </>
      )}

      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{ticket.nameEvent}</h3>
      </div>

      <div className={styles.subContainer}>
        <p>{`${date[2]}/${date[1]}/${date[0]}`}</p>
        <ul>
          {ticket.schedule.map((e) => (
            <li key={e}>{e} hrs</li>
          ))}
        </ul>
        <p>{ticket.direction}</p>
      </div>
      <p>Propietario(a): {ticket.nameUser}</p>
      <div className={styles.subContainerTwo}>
        <p className={styles.p}>Entradas:</p>
        <p className={styles.p}>{ticket.quantity}</p>
        <p className={styles.p}>Precio unitario:</p>
        <p className={styles.p}>{ticket.price}</p>
        <p className={styles.p}>Total: {ticket.total}</p>
      </div>
      <div>
        <ul className={styles.ul}>
          {ticket.seating.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <Link to={`/ticketpdf/${ticket.id}`}>
        <button className="bigBtn">PDF</button>
        </Link>
      </div>
    </>
  );
};

export default Ticket;
