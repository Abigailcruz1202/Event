import React, { useEffect, useState } from "react";
import styles from './SelectSector.module.css'
import { addShopping, tiketsSections } from '../../../actions/actions';
import { useDispatch, useSelector } from "react-redux";

const SelectSectorSin = ({data,idEvent,detailsEvent, user}) =>{

    const dispatch = useDispatch()
    const ticketsSections = useSelector(state => state.ticketsSections)
    const [secciones, setSecciones]=useState([])
    const [comprar, setComprar] = useState({
        name:'',
        limit:'',
        price:'',
    })
    useEffect(()=>{
         setSecciones(data.map((d)=>d.name))
    },[data])
    const changeSection=(e)=>{
        setComprar(data.find(s=>s.name === e.target.value))
    }
    const addCar = ()=>{
        console.log(detailsEvent,'jjjjjjjjjjjjjjjjjjjj')
        console.log(user,'userrrrrrrrrrrrrrr')

        const obj={
            id:detailsEvent.id,
            name:detailsEvent.name,
            fullName:user.fullName,
            idUser:user.id,
            promoterId:detailsEvent.promoterId,           
            type:false,//no croquis
            price:comprar.price,
            nameSection:comprar.name,
            direction:detailsEvent.addres,
            locationCountry:detailsEvent.location.country,
            locationProvince:detailsEvent.location.province,
            locationCity:detailsEvent.location.city,
            date:detailsEvent.start_date,
            schedule:detailsEvent.schedule,
            tags:detailsEvent.tags,
            pictures:detailsEvent.pictures,
            seating:['GENERAL'],
            idEvent,
        }
        dispatch(addShopping(obj))
        // detailsEvent.obj = obj
        // dispatch(tiketsSections(obj))
    }
    //console.log(ticketsSections,'eyyyyuuuuuuuuuuuuuuuuuuuuu')
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