import React from "react";
import styles from './ShoppingData.module.css'

const ShopingData = ({ result, events }) => {
  return (
    <div >
      <h3 className={styles.title}>Resumen de compra</h3>
      <ul className={ styles.ul}>
        {events.map((event) => (
          <li key={event.id}>
            <div className={styles.liSubContainer}>
              <p className={styles.p}> {event.name} </p>
              <p className={styles.p}>${event.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.total}>Total: ${result}</p>
    </div>
  );
};

export default ShopingData;
