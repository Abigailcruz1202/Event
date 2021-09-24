import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Card from '../Card/Card'
import style from './DisplayComments.module.css'


export default function DisplayComments(id) {
    const [data, setData] = useState([]) // Backup intocable
    const [tempDisplay, setTempDisplay] = useState([]) // Solo se muestra mientras que no haya click en estrellas izq
    const [display, setDisplay] = useState([]) // Solo se muestra cuando click en las estrellas de la izq
    const [eventRating, setEventRating] = useState(0) // Calificacion general

    
    useEffect(() => {
        const fetchData = async () => {
        let backup;
        let temporary;
        let generalRating;
        try {
            backup = await axios.get(`http://localhost:3001/api/comment/all?id=${id.state}`)
            temporary = await axios.get(`http://localhost:3001/api/comment/someComments?id=${id.state}`)
            generalRating = await axios.get(`http://localhost:3001/api/comment/generalRating?id=${id.state}`)
            if (backup && backup.data.length) setData(backup.data);
            if (temporary && temporary.data.length) setTempDisplay(temporary.data)
            if (generalRating && generalRating.data !== 0) setEventRating(generalRating.data)
        } catch (error) {
            console.log(error)
        }
        }
    fetchData()
    },[])

    //Diego: Recibe una calificacion y la convierte a estrellas. Puede recibir numeros enteros 1-5
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

    let keyGenerator = 0
    return (
        <div className={style.commentsWrapper}>
        {
            !tempDisplay.length ? (
                    
                        <p className={style.noReviews}>Este evento todavia no tiene comentarios.</p>
                    
                ) : (
                    <div>
                        <div className={style.leftContainer}>
                        {
                            eventRating !== 0 ? (
                                <>
                                    <p className={style.generalRating}>
                                    Rating General: <span className='general-stars'>{toStars(eventRating)}</span>
                                    </p>
                                    <p>
                                        {data.length} calificaciones para este evento.
                                    </p>
                                    <p onClick={e => setDisplay(tempDisplay)}>
                                        Ver todas
                                    </p>
                                    <div className={style.starContainer}>
                                        <p onClick={e => setDisplay(data[4].fiveStars)}>
                                            ★★★★★ {data[4].fiveStars.length / data.length * 100}%
                                        </p>
                                        <p onClick={e => setDisplay(data[3].fourStars)}>
                                            ★★★★☆ {data[3].fourStars.length / data.length * 100}%
                                        </p>
                                        <p onClick={e => setDisplay(data[2].threeStars)}>
                                            ★★★☆☆ {data[2].threeStars.length / data.length * 100}%
                                        </p>
                                        <p onClick={e => setDisplay(data[1].twoStars)}>
                                            ★★☆☆☆ {data[1].twoStars.length / data.length * 100}%
                                        </p>
                                        <p onClick={e => setDisplay(data[0].oneStar)}>
                                            ★☆☆☆☆ {data[0].oneStar.length / data.length * 100}%
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <p className={style.noRating}>
                                    Este evento todavia no tiene calificaciones.
                                </p>
                            )
                        }
                        </div>
                        <div className={style.rightContainer}>
                        {
                            !display.length ? (

                                    tempDisplay.map(comment => (
                                    <Card
                                        key={keyGenerator++}
                                        name={`${comment.user.first_name} ${comment.user.last_name}`}
                                        rating={toStars(comment.rating)}
                                        review={comment.review}
                                    />)
                                    )
                                
                            ) : (
                                display.map(comment => (
                                    <Card
                                        key={keyGenerator++}
                                        name={`${comment.user.first_name} ${comment.user.last_name}`}
                                        rating={toStars(comment.rating)}
                                        review={comment.review}
                                    />)
                                )
                            )
                        
                        }
                        </div>
                    </div>
            )
        }
        </div>
    )
}
