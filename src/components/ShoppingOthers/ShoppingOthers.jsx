import React, { useEffect } from "react";
import { connect } from "react-redux";
import ActivityCard from "../ActivityCard/ActivityCard";
import styles from "./ShoppingOthers.module.css";
import { getEventsHome } from "../../actions/actions";


const ShoppingOthers = ({ events, getEventsHome }) => {
  let moreEvents = [];

    useEffect(() => {
    getEventsHome();
  }, [getEventsHome]);

  for (let i = 0; i < 3; i++) {
    moreEvents.push(events[i])
  }

 
 
  return (
    <div>
      <h3>Mas Eventos En Tu Ciudad</h3>
      {events.length !== 0? (
        <ul className={styles.ul}>
          {moreEvents.map(e => (
            <li key={e.id}> <ActivityCard 
            event={e}
            /></li>
          ))}
        </ul>
      ) : (
        <h3>No hay eventos que mostrar</h3>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    events: state.eventsHome,
  };
}

export default connect(mapStateToProps, { getEventsHome })(ShoppingOthers);
