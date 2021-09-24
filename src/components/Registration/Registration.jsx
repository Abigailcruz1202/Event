import React, { useState } from 'react';
import FormPromoter from "../FormPromoter/FormPromoter.jsx";
import FormUsers from "../FormUsers/FormUsers";
import styles from './Registration.module.css'

const Registration = () => {
const [Switch, setSwitch] = useState('user')

const switchBtn = () => {
    if(Switch === 'user'){
        setSwitch('promoter')
    }else setSwitch('user')

}

    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.title}>Registrate</h2>
            <div className={styles.container}>
                <button className='btnForm margin15 margBtm0' onClick={switchBtn}>User</button>
                <button className='btnForm margin15 margBtm0' onClick={switchBtn}>Promoter</button>
            </div>
            
            {Switch === 'user'
            ?
            <FormUsers />
            :
            <div className={styles.formPromoter}>
                <FormPromoter />    
            </div>
          }
        </div>
    )
}

export default Registration
