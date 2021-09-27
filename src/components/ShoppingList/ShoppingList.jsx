import React from "react";
import styles from './ShoppingList.module.css'

const ShoppingList = ({ events }) => {
  return (
    <>
      <ul className={styles.ul}>
        {events.map((event) => (
          <li
          className={styles.li}
          key={ event.id}>
            <img src={event.picture[0]} alt="" className={styles.img}/>
            <h4> {event.name} </h4>
            <p className={styles.tag}>{event.tags}</p>
            <p className={styles.p}>${event.price}</p>
            <div className={styles.middle}>
            <label className={styles.label}></label>
            <select
            //   name="number"
            //   onChange={actualizarState}
            //   value={difficulty}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

          </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShoppingList;
