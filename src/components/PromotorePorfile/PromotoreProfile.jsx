import React, { useEffect } from "react";
import ListEvent from "./ListEvent";
import Grafica from  './GraphPromoter'
import styles from './PromotorePorfile.module.css';
import {Link} from 'react-router-dom'
import { getEventPromoter } from "../../actions/actions";
import { connect } from 'react-redux';

const PromotorePorfile = ({userData, getEventPromoter, promoterEvents}) =>{
    console.log('soy user data',userData)
    useEffect(()=>{
        const getEvents = async()=>{
            try{
            const events = await getEventPromoter(userData.id)
            return events
            }catch(error){
                console.log(error)
                return error
            }
        }
        const eventos = getEvents()
    },[])
    return(
        <div className={styles.contPrin}>
            <div className={styles.contProfile}>
                <div className={styles.imgProfile}>
                    <img src={userData.picture} alt="" />
                </div>
            </div>
            <div className={styles.contInfo} >
                <h3>{userData.business_type} {userData.business_name}</h3>
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
            
                <ListEvent events={promoterEvents}/>
            </div>
            <Grafica/>

        </div>
    );
}

function mapStateToProps(state){
    return {
        promoterEvents:state.promoterEvents
    }
}

export default connect(mapStateToProps,{getEventPromoter})(PromotorePorfile)