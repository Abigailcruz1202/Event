import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./ShoppingListItem.module.css";
import { addCheckout, deleteCheckout } from "../../actions/actions";

const ShoppingListItem = ({ event, setDelCart, addCheckout, deleteCheckout }) => {
  
  const [NumItem, setNumItem] = useState(1);
  const [NewPrice, setNewPrice] = useState(event.price)
  const eventCheck = {
      sku: event.id,
      name: event.name,
      price: `${event.price}.00`,
      quantity: NumItem,
      currency: 'MXN'
  }

  useEffect(() => {
    addCheckout(eventCheck)
  }, [NumItem])
 
  const setEliminate = (id) => {
    setDelCart(id);
    deleteCheckout(id)
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
      <p className={styles.p}>${(event.price)*NumItem}</p>
      <div className={styles.middle}>
        {NumItem === 1 ? (
          <button></button>
        ) : (
          <button onClick={setDel}>-</button>
        )}
        <p>{NumItem}</p>
        <button onClick={setAdd}>+</button>
      </div>
      <button onClick={() => setEliminate(event.id)}>X</button>
    </li>
  );
};


function mapStateToProps(state) {
  return {
    events: state.eventsHome,
    checkOut: state.checkoutItems
  };
}

export default connect(mapStateToProps, { addCheckout, deleteCheckout })(ShoppingListItem);