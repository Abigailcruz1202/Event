import React, { useEffect, useState } from 'react';
import { useRouteMatch } from "react-router-dom"; 
import axios from 'axios';
import styles from './TicketsContainer.module.css';
import TicketsList from '../TicketsList/TicketsList';
import moment from "moment";
import "moment/locale/es";


const TicketsContainer = () => {
     const API = 'https://event-henryapp-backend.herokuapp.com/api/'
    // const API = 'http://localhost:3001/api/'
    // const ID = 'fb3a7e28-67cf-434f-855e-2b83acab361f'
    const props = useRouteMatch();
    const ID = props.params.id;
    
    const [ArrTickets, setArrTickets] = useState([]);
    const [Switch, setSwitch] = useState(true)
    
     useEffect(() => {
    const fetchTickets = async () =>{
      const tickets = await axios.get(`${API}ticket/user/${ID}`)
      console.log('tickets--------------',tickets)
      setArrTickets(tickets.data);
    }
    fetchTickets();
  },[setArrTickets]);

  //funciones
const setSwitchPass = () => {
  setSwitch(true)
}
const setSwitchProx = () => {
  setSwitch(false)
}


  //separar eventos pasados
  const nowEvents = ArrTickets.filter(e => moment(e.date).format('L') === moment().format('L'))
  const passEvents = ArrTickets.filter(e => moment(e.date) < moment().subtract(1, 'days'))
  const proxEvents = ArrTickets.filter(e => moment(e.date) > moment())
//ordenar por fecha
  moment.locale("es");
  const sortedPassEvents = passEvents.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
  const sortedProxEvents = proxEvents.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());

    return (
        <div className={styles.container}>
          <h2 className={styles.title}>Mis Boletos</h2>
          {nowEvents.length !== 0?
          <div className={styles.ulContainerNow}>
          <h3>Eventos de Hoy</h3>
          <ul className={styles.ul}>
          <TicketsList
              ArrTickets={nowEvents}
              />
          </ul>
          </div>
          :
          <div></div>
        }
          
          <div>
          <button className="regularBtn" onClick={setSwitchPass}>Próximos</button>
          <button className="regularBtn" onClick={setSwitchProx}>Pasados</button>
          </div>
          {Switch?
          <div className={styles.ulContainer}>
          <h3 >Proximos eventos</h3>
            <ul className={styles.ul}>
            <TicketsList
                ArrTickets={sortedProxEvents}
                />
            </ul>
          </div>
            :
            <div className={styles.ulContainer}>
            <h3>Eventos pasados</h3>
            <ul className={styles.ul}>
            <TicketsList
                ArrTickets={sortedPassEvents}
                />
            </ul>
            </div>
          }
        </div>
    )
}

export default TicketsContainer

