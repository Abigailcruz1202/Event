import React,{useState,useEffect} from "react";
import styles from './Event.module.css';
import {Link} from 'react-router-dom'
import axios from 'axios'



const Evento=({props})=>{
    let {name, qualification, id,start_date}=props
    const [eventRating, setEventRating] = useState(0)
     
    useEffect(() => {
        const fetchData = async () => {
        let generalRating;
        try {
            generalRating = await axios.get(`https://event-henryapp-backend.herokuapp.com/api/comment/generalRating?id=${props.id}`)
            if (generalRating && generalRating.data !== 0) setEventRating(generalRating.data)
        } catch (error) {
            console.log(error)
        }
        }
    fetchData()
   
    },[])

    const toStars = (grade) => {
        let result = ''
        while (grade !== 0){
            result += '★'
            grade--
        }        
        while (result.length < 5) {
            result += '☆'
        }
        return result
    }

  

    return (
        <div className={styles.contEvent}>
            <div className={styles.contName}>
                <div>{name}</div>
                <div>{start_date}</div>               
            </div>
            <div className={styles.contQuali}>
                {toStars(eventRating)}
            </div>
            <div className={styles.btn}>
                <Link to ={`/eventDetailsUsuario/${id}`}>Detalle</Link>
            </div>
        </div>
    );
}

export default Evento