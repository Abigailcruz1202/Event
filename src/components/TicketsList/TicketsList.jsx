import React from 'react';
import Ticket from '../Ticket/Ticket';
import styles from './TicketsList.module.css'

const TicketsList = ( { ArrTickets } ) => {
    return (
        <>
        {ArrTickets.map(ticket => (
              <li key={ticket.id} className={styles.li}>
                <Ticket 
                  ticket={ticket}
                />
              </li>

            ))}
        </>
    )
}

export default TicketsList
