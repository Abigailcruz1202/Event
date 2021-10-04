import React from 'react'

const Ticket = ( { ticket } ) => {
    return (
          <>
                  
                  <div>
                <h3>{ticket.nameEvent}</h3>
                <p>{ticket.nameUser}</p>
                <p>{ticket.price}</p>
                <p>{ticket.quantity}</p>
                <p>{ticket.total}</p>
                <p>{ticket.direction}</p>
                <p>{ticket.date}</p>
                <p>{ticket.schedule}</p>
                <p>{ticket.seating}</p>
                  </div>
                <div>
                <h3>Parte 2</h3>
                </div>
               </>
    )
}

export default Ticket
