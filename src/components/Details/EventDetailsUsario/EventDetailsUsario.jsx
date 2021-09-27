import React, { useState, useEffect } from 'react';
import DisplayComments from '../../Comments/DisplayComments/DisplayComments';
import { Link , useParams, useHistory} from 'react-router-dom';
import  {useDispatch , useSelector} from 'react-redux';
import {getEventDetail, changeModal} from '../../../actions/actions';
import { Carousel } from 'react-carousel-minimal';
import Loading from '../../Loading/Loading';
import styles from './EventDetailsUsario.module.css';




// import Logo from '../../../Utilities/logodivinacodi.gif'
// import eVent from '../../../Utilities/eVent-05.svg'

const pushDta=(detailsEvent)=>{
    let data = [];
    let picture = detailsEvent.consult?.pictures
    
    for (let index = 0; index < picture?.length; index++) {
        data.push({image:picture[index],caption:detailsEvent.consult.description})
    }
    return data;
}
//Diego: Componente que muestra los detalles de un evento para el tipo Usuario.
export default function EventDetailsUsario() {
    const [render, setRender] = useState(false)
    const [data , setData] = useState()
    const dispatch = useDispatch()
    const params =useParams()
    const {id}=params
    const detailsEvent = useSelector(state => state.detailsEvent)
    const userInfo = useSelector(state => state.userState)
    const history = useHistory();

    console.log(userInfo)
    useEffect( () => {
        const fetchData = async () => {
            try{
                await dispatch(getEventDetail(id))
                setRender(true)
            }catch(error){
                alert('intentalo mas tarde')
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);


    // const  logo = Logo
    // const event = eVent
    //Borrar evento boton unicamente disponoble para promotor
    const deleteEvent = async()=>{
        console.log(detailsEvent.consult.promoterId,userInfo.id)       
        if(detailsEvent.consult.promoterId === userInfo.id){
            const res = await fetch(`http://localhost:3001/api/event/delete/${id}`,
                {
                    method:'DELETE'
                }
            )
            const data = await res.text();
            history.push('/perfil');
            // console.log(data)
        }else{
            dispatch(changeModal(
                'correct','No puedes eliminar un evento que no te pertenece'
            ))
        }
    }
    const editEvent = () =>{}
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    useEffect(()=>{
        setData(pushDta(detailsEvent))
    },[detailsEvent])



    if(render){
        const whats ={whats:`https://api.whatsapp.com/send?phone=${detailsEvent.consult.promoter.phone}`}
        console.log('hola',whats)
        console.log('whats',whats.whats)
            return(   
            <div className={styles.detailsAllUser}>
                <div className='detailsCardUser'> 
                    <div className='deailscard2User'>
                        <h1 className={styles.titleCard}>{detailsEvent.consult.name}</h1>
                        <div className='img'>                               
                            <Carousel   
                                data={data}
                                time={5000}
                                width="650px"
                                height="400px"
                                radius="10px"
                                slideNumber={true}
                                slideNumberStyle={slideNumberStyle}
                                captionPosition="bottom"
                                automatic={true}
                                dots={false}
                                pauseIconColor="white"
                                pauseIconSize="40px"
                                slideBackgroundColor="darkgrey"
                                slideImageFit="auto"
                                thumbnails={true}
                                thumbnailWidth="100px"
                                style={{
                                    maxWidth: "650px",
                                    maxHeight: "450px",
                                    margin: "40px auto",
                                }} />                               
                        </div>  
                        <div className={styles.otherDetailsUser}>  
                            <br/> 
                            <h4>Descripcion:</h4>
                            <p className={styles.description}>{ detailsEvent.consult.description}</p>
                            <div className={styles.detailsUsers2User}>
                                <div className={styles.leftColumn}>
                                    <h4>Artistas:</h4>
                                    <p>{` ${detailsEvent.consult.starring}`}</p>
                                    <h4>Dirreción:</h4>
                                    <p> {` ${detailsEvent.consult.address}`}</p>
                                    <h4>Fecha:</h4>
                                    <p>{` ${detailsEvent.consult.start_date}`}</p>
                                    <h4>Fecha Finalización:</h4>
                                    <p>{` ${detailsEvent.consult.finish_date}`}</p>
                                    <h4>Dias:</h4>
                                    <p>{` ${detailsEvent.consult.weekdays.map((e)=>(e))}`}</p>
                                </div>
                                <div className={styles.rightColumn}>
                                    <h4>Horarios:</h4>
                                    <p>{` ${detailsEvent.consult.schedule.map((e)=>(e))}`}</p>
                                    <h4>Tipo de Evento:</h4>
                                    <p>{` ${detailsEvent.consult.tags}`}</p>
                                    <h4>Clasificación:</h4>                            
                                    <p>{` ${detailsEvent.consult.age_rating}`}</p>
                                    <h4>Precio:</h4>
                                    <p>{` $${detailsEvent.consult.price}`}</p>
                                    
                                  
                                </div>                                
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                        {userInfo?.type=== 'promoter'||
                             <div className={styles.contRend}>
                                    <h2 className='formTitle'>Promotor</h2>
                                    <div className={styles.promoterRow}>
                                    <Link to='/PromoterPorfileUser'>
                                    <img
                                        src={detailsEvent.consult.promoter.picture}
                                        className={styles.promoterPicture}
                                    />
                                 </Link>
                                 <Link to='/PromoterPorfileUser'>
                                 <span className={styles.promoterName}>
                                        {`${detailsEvent.consult.promoter.business_name}`}
                                    </span>
                                </Link>
                                <div className={styles.whats}>
                                 <a href={whats.whats} target="_blank" rel="noopener noreferrer">
                                    <img src='https://1.bp.blogspot.com/-c156R1-yBRg/YIJJXWpUS9I/AAAAAAAAFP4/Q7eQOnTtqesWS2Q7s8CxireQvnB1OwNUwCLcBGAsYHQ/w680/logo-whatsApp-'className={styles.whats}/>
                                 </a>
                                 </div>
                                 </div>

                             </div>
                        }

                            {userInfo?.type === "promoter"?
                                <button className={styles.button} onClick={editEvent}>Editar</button>:
                                <button className={styles.button}>Reservar</button>
                            }   
                            {/* Si usuario no logeado, arrojar alerta de "no puedes comentar". Si usuario logeado de
                            tipo 'user', permitir linkear a ruta de creacion de comentarios. Si usuario logeado de
                            tipo 'promoter', no permitir dejar reseña pero si permitir eliminar el evento. */}
                                {
                                userInfo?.type === "user" ? (

                                    <Link to={{
                                            pathname:'/nuevoComentario',
                                            state: {
                                                id: id,
                                                eventName: detailsEvent.consult.name
                                            }
                                        }}>

                                        <button className={styles.button}>Reseña</button>
                                        </Link>
                                ) :
                                userInfo?.type === "promoter" ?
                                (
                                    <button className={styles.button} onClick={deleteEvent}>Eliminar</button>
                                ):
                                (
                                   
                                    <button 
                                        onClick={e => alert('Solo usuarios logeados pueden dejar comentarios')}
                                        className={styles.button}>    
                                        Reseña
                                    </button>
                                )} {/* {

                                    !userInfo.type ? (
                                        <button 
                                            onClick={e => alert('Solo usuarios logeados pueden dejar comentarios')}
                                            className={styles.button}>    
                                                Reseña
                                        </button>
                                    ) : (
                                            userInfo.type === 'user' ? (
                                                <Link to={{
                                                    pathname:'/nuevoComentario',
                                                    state: {
                                                        id: id,
                                                        eventName: detailsEvent.consult.name
                                                    }
                                                }}>
                                                <button className={styles.button}>Reseña</button>
                                                </Link>
                                            ) : (
                                                <button className={styles.button} onClick={deleteEvent}>Eliminar</button>
                                            )
                                    )
                                } */}
                        </div>
                        <div className='comments-container'>
                            <DisplayComments state={id}/>
                            <br />
                            <br />
                        </div>
                    </div>   
                </div>
            </div>      
    )} 
    else{
        return (<Loading/>)
    }
}