
import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import styles from './PerfilPromoterUsuario.module.css';
import {Link, useParams} from 'react-router-dom';
import {getPromoterUser} from '../../actions/actions';
import Loading from "../Loading/Loading";
import Card from './Card'
import axios from 'axios'



const PromotorePorfile = () =>{
    const [render, setRender] = useState(false)
   
    const [page, setPage]=useState(1)
    const [ppp]=useState(10)
    const dispatch =useDispatch();
    const params =useParams();
    const {id}=params;
    const promoterUser=useSelector(state=>state.promoterUser)
    console.log('soy promoter',promoterUser)


    useEffect( async ()=>{
        await dispatch(getPromoterUser(id))
        setRender(true)

    },[id])
  
    




    if(render){
        const indexOfLastEvents= page * ppp
    const indexOfFirstEvents = indexOfLastEvents - ppp
    const eventos = promoterUser.eventPromotor.events?.slice(indexOfFirstEvents,indexOfLastEvents)
    console.log('soy evento', eventos)
    const  p = np =>setPage(np)
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
           <div className={styles.cards}>
          { eventos ? 
                    eventos.map((e, id)=>{
                       return  <Card props={e} key={id}/> }) :
                        <Loading/>
                    }
           </div>
           
        </div>
       

    </div>
    );}else {return(<Loading/>)}
}



export default PromotorePorfile