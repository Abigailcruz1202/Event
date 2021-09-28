import React, { useState, useEffect } from 'react';
import DisplayComments from '../../Comments/DisplayComments/DisplayComments';
import { Link , useParams, useHistory} from 'react-router-dom';
import  { useDispatch , useSelector, connect } from 'react-redux';
import { getEventDetail, changeModal, editEvent, addShopping } from '../../../actions/actions';
import { Carousel } from 'react-carousel-minimal';
import Loading from '../../Loading/Loading';
import styles from './EventDetailsUsario.module.css';


const pushDta=(detailsEvent)=>{
    let data = [];
    let picture = detailsEvent.consult?.pictures
    
    for (let index = 0; index < picture?.length; index++) {
        data.push({image:picture[index],caption:detailsEvent.consult.description})
    }
    return data;
}
//Diego: Componente que muestra los detalles de un evento para el tipo Usuario.
const EventDetailsUsario = ({ addShopping, cart, user }) => {
    const [render, setRender] = useState(false)
    const [data , setData] = useState()
    const dispatch = useDispatch()
    const params =useParams()
    const {id}=params
    const detailsEvent = useSelector(state => state.detailsEvent)
    console.log('soy eventos',detailsEvent)
    const userInfo = useSelector(state => state.userState)
    const history = useHistory();

    useEffect( () => {
        const fetchData = async () => {
            try{
                await dispatch(getEventDetail(id))
                setRender(true)
            }catch(error){
                alert('Algo salio mal al cargar este evento.')
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const editEvento =() =>{
        dispatch(editEvent(detailsEvent.consult));
    }

    //Borrar evento boton unicamente disponoble para promotor
    const deleteEvent = async()=>{  
        if(detailsEvent.consult.promoterId === userInfo.id){
            const res = await fetch(`https://event-henryapp-backend.herokuapp.com/api/event/delete/${id}`,
                {
                    method:'DELETE'
                }
            )
                await res.json();
            history.push('/perfil');
        }else{
            dispatch(changeModal(
                'correct','No puedes eliminar un evento que no te pertenece'
            ))
        }
    }
    
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    useEffect(()=>{
        setData(pushDta(detailsEvent))
    },[detailsEvent])

    
    
    const setShopping = (event) => {
        addShopping(event)
    }
    
    
    
    if(render){
        
        const whats ={whats:`https://api.whatsapp.com/send?phone=${detailsEvent.consult.promoter.phone}`}
        //* funcion agregar al carrito...Gerardo
        let eventCart = []
        // detailsEvent.consult?
        // eventCart = cart.filter(e =>  e.id === detailsEvent.consult.id)
        // :eventCart = []
        
            return(   
            <div className={styles.detailsAllUser}>
                <div className='detailsCardUser'> 
                    <div className={styles.detailsCard2User}>
                        <h1 className={styles.titleCard}>{detailsEvent.consult.name}</h1>
                        <div className={styles.carouselImages}>                               
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
                                    <h4>País:</h4>
                                    <p> {` ${detailsEvent.consult.location.country}`}</p>
                                    <h4>Estado/Provincia:</h4>
                                    <p> {` ${detailsEvent.consult.location.province}`}</p>
                                    <h4>Ciudad:</h4>
                                    <p> {` ${detailsEvent.consult.location.city}`}</p>
                                    <h4>Dirreción:</h4>
                                    <p> {` ${detailsEvent.consult.address}`}</p>
                                    <h4>Fecha:</h4>
                                    <p>{` ${detailsEvent.consult.start_date}`}</p>
                                    
                                </div>
                                <div className={styles.rightColumn}>
                                    <h4>Fecha Finalización:</h4>
                                    <p>{` ${detailsEvent.consult.finish_date}`}</p>
                                    <h4>Dias:</h4>
                                    <p>{` ${detailsEvent.consult.weekdays.map((e)=>(e))}`}</p>
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
                        {user.type !== 'user'? <div></div>: 
                            <>
                            {eventCart.length === 1? <h3>Este evento ya se agrego al carrito</h3>: 
                                <button onClick={() => setShopping(detailsEvent.consult)}>
                                <span className={styles.icon}>
                                    <i className="fas fa-shopping-cart"></i>
                                </span>
                                </button>
                            }
                            </>
                        }
                        {userInfo?.type=== 'promoter'||

                        <div className={styles.contRend}>
                                <h2 className='formTitle'>Promotor</h2>
                                <div className={styles.promoterRow}>
                                <Link to={`/PromoterPorfileUser/${detailsEvent.consult.promoter.id}`}>
                                <img
                                    src={detailsEvent.consult.promoter.picture}
                                    className={styles.promoterPicture}
                                    alt=''
                                />
                                
                           
                            <span className={styles.promoterName}>
                                    {`${detailsEvent.consult.promoter.business_name}`}
                                </span>
                            </Link>
                            
                            <div className={styles.whats}>
                            <a href={whats.whats} target="_blank" rel="noopener noreferrer">
                                <img src='https://1.bp.blogspot.com/-c156R1-yBRg/YIJJXWpUS9I/AAAAAAAAFP4/Q7eQOnTtqesWS2Q7s8CxireQvnB1OwNUwCLcBGAsYHQ/w680/logo-whatsApp-'className={styles.whats} alt=''/>
                            </a>
                            </div>
                            </div>
                        </div>
                        }

                        {
                            !userInfo.type ? (
                                <span>&nbsp;</span>
                            ) : (
                                userInfo.type === 'promoter' ? (
                                <>
                                    <button className={styles.button} onClick={editEvento}>Editar</button>
                                    <button className={styles.button} onClick={deleteEvent}>Eliminar</button>
                                </>
                                ) : (
                                    <button className={styles.button}>Reservar</button>
                                )
                            )
                        
                        } 
                        </div>

                        <div className='comments-container'>
                            <DisplayComments state={id}/>
                            <div>
                                {
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
                                            <span>&nbsp;</span>
                                        )
                                    )
                                }
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>   
                </div>
            
    )} 
    else{
        return (<Loading/>)
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cartState,
        user: state.userState
    };
}

    export default connect(mapStateToProps, { addShopping })(EventDetailsUsario);