import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./ShoppingListItem.module.css";
import { addCheckout, deleteCheckout, addTicket, deleteTicket, setTotalCheckout } from "../../actions/actions";

const ShoppingListItem = ({ event, setDelCart, addCheckout, deleteCheckout, addTicket, user, deleteTicket }) => {
  
  const [NumItem, setNumItem] = useState(1);
  const [NewPrice, setNewPrice] = useState(event.price)
  const eventCheck = {
      sku: event.id,
      name: event.name,
      price: `${event.price}.00`,
      quantity: NumItem,
      currency: 'MXN'
  }
  const ticket = {
    idUser: user.id,
    nameUser: user.username,
    idEvent: event.id,
    nameEvent: event.name,
    unityPrice: event.price,
    total: Number(event.price) * NumItem,
    quantity: NumItem,
    direction: 'sin direccion',
    date: event.start_date,
    schedule: event.schedule,
    seatings: ['a1','a2']
  }

  useEffect(() => {
    addCheckout(eventCheck)
    addTicket(ticket)
  }, [NumItem])
 
  const setEliminate = (id) => {
    setDelCart(id);
    deleteCheckout(id);
     deleteTicket(id);  
  }; 

  const setAdd = () => {
    setNumItem(NumItem + 1);
    setPlus();
  };
  const setPlus = () => {
    setNewPrice(Number(event.price) + (Number(event.price) * NumItem))
   
  };

  const setDel = () => {
    setNumItem(NumItem - 1);
    setSub()
  };
  const setSub = () => {
    setNewPrice((NewPrice - NewPrice / NumItem))

  };

  return (
    <li className={styles.li} key={event.id}>
      <img src={event.pictures[0]} alt="" className={styles.img} />
      <h4> {event.name} </h4>
      <p className={styles.tag}>{event.tags}</p>
      <div className={styles.middle}>
        {NumItem === 1 ? (
          <button className={styles.btnCount}></button>
        ) : (
          <button onClick={setDel} className={styles.btnCount}>-</button>
        )}
        <p className={styles.num}>{NumItem}</p>
        <button onClick={setAdd} className={styles.btnCount}>+</button>
      </div>
      <p className={styles.p}>${(event.price)*NumItem}</p>
      <button onClick={() => setEliminate(event.id)} className={styles.close}>X</button>
    </li>
  );
};


function mapStateToProps(state) {
  return {
    checkOut: state.checkoutItems,
    user: state.userState,
  };
}

export default connect(mapStateToProps, { addCheckout, deleteCheckout, addTicket, deleteTicket })(ShoppingListItem);