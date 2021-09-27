import React from 'react';
import { connect } from "react-redux";
import ActivityCard from '../ActivityCard/ActivityCard';
import styles from './ShoppingOthers.module.css'


const ShoppingOthers = ( { events }) => {

  

    let eventOne = events.filter(event => event.id === 1)
    let eventTwo = events.filter(event => event.id === 2)
    let eventThree = events.filter(event => event.id === 3)
    
console.log(eventOne)
    return (
        <div>
            <h3>Mas Eventos En Tu Ciudad</h3>
          <ul className={styles.ul}>
              <li>
                  <ActivityCard 
                    event={eventOne[0]}
                  />
              </li>
              <li>
                  <ActivityCard 
                    event={eventTwo[0]}
                  />
              </li>
              <li>
                  <ActivityCard 
                    event={eventThree[0]}
                  />
              </li>
          </ul>
            
        </div>
    )
}


function mapStateToProps(state) {
    return {
      events: state.eventsHome
    };
  }
  
  export default connect(mapStateToProps)(ShoppingOthers);