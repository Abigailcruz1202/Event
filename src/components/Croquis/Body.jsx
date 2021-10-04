import React, {useEffect, useState} from 'react'
import  { useDispatch , useSelector} from 'react-redux';
import { getEventDetail} from '../../actions/actions';
import { Link , useParams} from 'react-router-dom';
import Loading from '../Loading/Loading';
import s from './CssForAll.module.css'


export function BodyCroquis (){
    const [render ,setRender]=useState(false)
    const[disponible , setDisponible]=useState()
    const dispatch =useDispatch()
    const params = useParams()
    const{id}=params 
    const detailsEvent = useSelector(state => state.detailsEvent)
    console.log('soy details ', detailsEvent)

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
 
     

    // crea evento colunas3 filas 3
    // A 1  3
    //b   1 3
    //C  13
    // pensar como voy a poner cada uno npm start
    //arrya 3 columnas  a1 , eliminar  c3 
    //on clik filter filtramos todos lo que quedo en esa posicion == un estado lo que selecciono 
// array dos dimensiones 
// reservar  cambia a no diponible en el back con put  y eso es lo se guarda en la base 
/// tenemos q conectar con gera 
// general como array 


    function handleClick (){
        console.log('hago click')
        setDisponible('no disponible')
        console.log('soy disponible',disponible)
        }
    

    if(render){
        const hols =detailsEvent.consult.section.general
        console.log('soy el a1',hols)

        const click = detailsEvent.consult.section.general.filter((e)=>e.A)
        console.log('soy a', click)   
    return(
        <>
          <button onClick={click}>hola</button>
         <button onClick={handleClick}>Reservar</button>
        </>
    )}else {
        return (<Loading/>)
    }
}

export default BodyCroquis