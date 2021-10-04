import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TicketsContainer.module.css';
import TicketsList from '../TicketsList/TicketsList'

const TicketsContainer = () => {
    const API = 'https://event-henryapp-backend.herokuapp.com/api/'
    const ID = 'd123cf7a-e1f7-4e21-b425-7f905ade9954'

    const [ArrTickets, setArrTickets] = useState([]);
    const [Loading, setLoading] = useState(false)
    
     useEffect(() => {
    const fetchTickets = async () =>{
      const tickets = await axios.get(`${API}ticket/${ID}`)
      console.log('tickets--------------',tickets)
      setArrTickets(tickets.data);
      setLoading(false);
    }
    fetchTickets();
  },[setArrTickets,setLoading]);


    return (
        <div>
            <h2 >Desde tickets</h2>
            <ul className={styles.ul}>
            <TicketsList
                ArrTickets={ArrTickets}
                />
            </ul>
        </div>
    )
}

export default TicketsContainer
