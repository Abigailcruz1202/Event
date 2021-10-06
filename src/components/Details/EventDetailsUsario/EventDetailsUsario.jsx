import React, { useState, useEffect } from 'react';
import DisplayComments from '../../Comments/DisplayComments/DisplayComments';
import { Link , useParams, useHistory} from 'react-router-dom';
import  { useDispatch , useSelector, connect } from 'react-redux';
import { getEventDetail, changeModal, editEvent, addShopping,changeModalConfirm, API } from '../../../actions/actions';
import { Carousel } from 'react-carousel-minimal';
import Loading from '../../Loading/Loading';
import Heart from "react-animated-heart";
import styles from './EventDetailsUsario.module.css';
import axios from 'axios';
import CroquisEvent from '../../CroquisEvent/CroquisEvent';
import SelectSectorSin from './SelectSectorSin';


const pushDta=(detailsEvent)=>{
    let data = [];
    let picture = detailsEvent.consult?.pictures
    for (let index = 0; index < picture?.length; index++) {
        data.push({
            image:picture[index],
            caption:detailsEvent.consult.description,
        })
    }
    return data;
}
//Diego: Componente que muestra los detalles de un evento para el tipo Usuario.
const EventDetailsUsario = ({ addShopping, cart, user, changeModalConfirm }) => {
    
    const [render, setRender] = useState(false)
    const [data , setData] = useState()
    const [isClick, setClick] = useState(false); // Estado del corazon de favoritos
    const [isFavorite, setFavorite] = useState(false); // Muestra si el usuario ya tenia el evento favorito

    const dispatch = useDispatch()
    const params = useParams()

    const {id} = params
    const detailsEvent = useSelector(state => state.detailsEvent)
    const userInfo = useSelector(state => state.userState)
    
    
    //console.log(JSON.parse(detailsEvent.consult.sectorize),'aquiiiiiiiiiiiiiiii mirameeeeeeeeeeee no te hagasssssssss')
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

    const deleteEvent = async()=>{  
        if(detailsEvent.consult.promoterId === userInfo.id){
            changeModalConfirm('correct', `Desea Eliminar el Evento ${detailsEvent.consult.name}`, null);
        }else{
            dispatch(changeModal('correct','No puedes eliminar un evento que no te pertenece'));
        }        
    }
    //Fin Borrar evento boton unicamente disponoble para promotor

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
    
    // Diego: Permite saber si el usuario ya tiene este evento como Favorito para actualizarlo en el DOM
    useEffect(() => {
        const checkFavorite = async () => {
            if (!userInfo.id) return
            try {
                const req = await axios.get(`${API}user/${userInfo.id}`)
                let isFavoriteResult = req?.data.favorite[0].includes(detailsEvent.consult?.name)
                if (isFavoriteResult) {
                    setClick(true)
                    setFavorite(true)
                }                          
            } catch (error) {
                console.log(error)
            }
        }
        checkFavorite()
    },[userInfo.id, detailsEvent])

    // Diego: Si el usuario favoritea, se hace el put. Si ya habia favoriteado anteriormente, no se hace.
    // Si destilda el corazon, se elimina de favoritos.
    useEffect(() => {
        const addToFavorites = async () => {
            if (isClick && !isFavorite) {
                const req = await axios.get(`${API}user/${userInfo.id}`)
                let isFavoriteResult = req.data.favorite[0]?.includes(detailsEvent.consult?.name)
                if (isFavoriteResult) return

                await axios.put(`${API}user/fav`,{
                    id_user: userInfo.id,
                    event: {
                        name: detailsEvent.consult.name,
                        id: id
                    },
                })
                setFavorite(true)
            }
            else if (!isClick && isFavorite) {
                const removeFavorite = async () => {
                    await axios.put(`${API}user/fav`,{
                    id_user: userInfo.id,
                    event: id
                })
                }
                removeFavorite()
                setFavorite(false)
            }
        }
        addToFavorites()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isClick, isFavorite])
    
    if(render){
        
        const whats ={whats:`https://api.whatsapp.com/send?phone=${detailsEvent.consult.promoter.phone}`}
        
         //* funcion agregar al carrito...Gerardo
        let eventCart = []
        // detailsEvent.consult?
        eventCart = cart.filter(e =>  e.id === detailsEvent.consult.id)
        // :eventCart = []
        console.log(detailsEvent.consult)
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
                            {
                                // Boton de Favoritos
                                !userInfo.type ? (
                                    <div className={styles.heart}>
                                        <Heart                                            
                                            isClick={isClick}
                                            onClick={() => {
                                                alert('Inicia sesión para guardar este evento en tus favoritos.')                                            
                                            }} 
                                        />
                                    </div>
                                ) : (
                                    userInfo.type === 'user' ? (                                        
                                        <div className={styles.heart}>
                                            <Heart                                             
                                            isClick={isClick}
                                            onClick={() => {
                                                setClick(!isClick)
                                            }} 
                                            />
                                        </div>
                                    ) : (
                                        <span>&nbsp;</span>
                                    )
                                )
                                
                            }
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
                            {detailsEvent.consult.sectorize==='sectorizar con croquis' ?                              
                                <CroquisEvent idEvent={id} data={detailsEvent.consult.sections}/>
                                :null
                            }
                            {detailsEvent.consult.sectorize==='sectorizar sin croquis' ?                              
                                <SelectSectorSin idEvent={id} data={detailsEvent.consult.sections}/>
                                :null
                            }
                            {detailsEvent.consult.sectorize==='no sectorizar' ? 
                                eventCart.length === 1? <h3>Este evento ya se agrego al carrito</h3>: 
                                    <button onClick={() => setShopping(detailsEvent.consult)}>
                                        <span className={styles.icon}>
                                            <i className="fas fa-shopping-cart"></i>
                                        </span>
                                    </button>
                                :null
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
        user: state.userState,
        modalConfirm: state.modalConfirm,
    };
}

    export default connect(mapStateToProps, { addShopping, changeModalConfirm })(EventDetailsUsario);