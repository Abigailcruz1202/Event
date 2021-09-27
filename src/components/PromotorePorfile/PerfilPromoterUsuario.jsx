
import React, { useState,useEffect } from "react";
import ListEvent from "./ListEvent";
import { useDispatch,useSelector } from "react-redux";
import styles from './PerfilPromoterUsuario.module.css';
import {Link, useParams} from 'react-router-dom';
import {getPromoterUser} from '../../actions/actions';
import Loading from "../Loading/Loading";


const PromotorePorfile = () =>{
    const [render, setRender] = useState(false)
    const dispatch =useDispatch();
    const params =useParams();
    const {id}=params;
    const promoterUser=useSelector(state=>state.promoterUser)
    console.log('soy promoter',promoterUser)


    useEffect(async()=>{
        await dispatch(getPromoterUser(id))
        setRender(true)

    },[id])
    console.log('soy id',id)
    console.log('soy get',getPromoterUser)
    //
    if(render){
        const whats ={whats:`https://api.whatsapp.com/send?phone=${promoterUser.eventPromotor.phone}`}
        console.log('soy whasts',whats)
        return(
        <div className={styles.contPrin}>
        <div className={styles.contProfile}>
        <div className={styles.imgProfile}>
                <img src={promoterUser.eventPromotor.picture} alt="" />
            </div>
        </div>
        <div className={styles.contInfo} >
            <h3>{promoterUser.eventPromotor.business_name}</h3>
            <h3>{promoterUser.eventPromotor.business_type} </h3>
            <div className={styles.whats}>
                 <a href={whats.whats} target="_blank" rel="noopener noreferrer">
                  <img src='https://1.bp.blogspot.com/-c156R1-yBRg/YIJJXWpUS9I/AAAAAAAAFP4/Q7eQOnTtqesWS2Q7s8CxireQvnB1OwNUwCLcBGAsYHQ/w680/logo-whatsApp-'className={styles.whats}/>
                  
                  </a>
                  
                  </div>
        </div>
        <hr/>
        
        <div className={styles.contEvents}>
            <div className={styles.barEvent}>  
                <h4>Mis Eventos</h4>
                       
            </div>
           <div>
           <Link to={`/eventDetailsUsuario/${promoterUser.eventPromotor.events.map((e)=>e.id)}`}className={styles.link}>
               <h2>{promoterUser.eventPromotor.events.map((e)=>e.name)}</h2>
               <img src={promoterUser.eventPromotor.events.map((e)=>e.pictures[0])} alt='Imagen del evento'/>
            </Link>
           </div>
           
        </div>
       

    </div>
    );}else {return(<Loading/>)}
}



export default PromotorePorfile