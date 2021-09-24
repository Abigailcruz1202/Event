import React from "react";
import ListEvent from "./ListEvent";
import styles from './PromotorePorfile.module.css';
import {Link} from 'react-router-dom'
const PromotorePorfile = () =>{
    return(
        <div className={styles.contPrin}>
            <div className={styles.contProfile}>
                <div className={styles.imgProfile}>
                    <img src="" alt="" />
                </div>
            </div>
            <div className={styles.contInfo} >
                <h3>Teatro Julio Mario Santodomingo</h3>
            </div>
            <hr/>
            
            <div className={styles.contEvents}>
                <div className={styles.barEvent}>  
                    <h4>Mis Eventos</h4>
                    <Link to='/FormEvent' className={styles.link}>              
                        <button className={styles.btnAddEvent}>
                            Nuevo Evento 
                        </button>     
                    </Link>           
                </div>
            
                <ListEvent />
            </div>
        </div>
    );
}
export default PromotorePorfile