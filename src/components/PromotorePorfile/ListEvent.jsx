import React from 'react';
import styles from './ListEvent.module.css';
import Evento from './Event';
import FakeDB from '../../FakeDB/FakeDB'
const ListEvent = ()=>{
    return(
        <div className={styles.containerList}>
            {FakeDB.map((event)=>
                <Evento name={event.name} qualification='4' id={event.id}/>
            )}
        </div>
    )
}

export default ListEvent