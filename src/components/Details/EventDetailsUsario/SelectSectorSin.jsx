import React, { useEffect, useState } from "react";
import styles from './SelectSector.module.css'
import { addShopping, tiketsSections } from '../../../actions/actions';
import { useDispatch, useSelector } from "react-redux";

const SelectSectorSin = ({data,idEvent,detailsEvent}) =>{

    const dispatch = useDispatch()
    const ticketsSections = useSelector(state => state.ticketsSections)
    const [secciones, setSecciones]=useState([])
    const [comprar, setComprar] = useState({})
    useEffect(()=>{
         setSecciones(data.map((d)=>d.name))
    },[data])
    const changeSection=(e)=>{
        setComprar(data.find(s=>s.name === e.target.value))
    }
    const addCar = ()=>{
        dispatch(addShopping(detailsEvent))
        const obj={
            type:false,//croquis?
            info:comprar,
            idEvent,
        }
        dispatch(tiketsSections(obj))
    }
    console.log(ticketsSections,'eyyyyuuuuuuuuuuuuuuuuuuuuu')
    return(
        <>
            <select className={styles.selectSections} onChange={changeSection}>
                <option value="" >Seleccione Sector</option>
                {secciones.map(seccion=>
                    <option key={seccion} value={seccion}>{seccion}</option>
                )}
            </select>
            {comprar.limit?<button onClick={addCar}>Agregar al carrito</button>:
            null   
            }
        </>
    )
}

export default SelectSectorSin