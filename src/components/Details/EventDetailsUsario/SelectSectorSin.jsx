import React, { useEffect, useState } from "react";
import styles from './SelectSector.module.css'


const SelectSectorSin = ({data,id}) =>{
    console.log(data,'desdeee seccion')
    const [secciones, setSecciones]=useState([])
    const [comprar, setComprar] = useState({})
    useEffect(()=>{
         setSecciones(data.map((d)=>d.name))
    },[data])
    const changeSection=(e)=>{
        setComprar(data.find(s=>s.name === e.target.value))
    }
    return(
        <select className={styles.selectSections} onChange={changeSection}>
            <option value="" >Seleccione Sector</option>
            {secciones.map(seccion=>
                <option key={seccion} value={seccion}>{seccion}</option>
            )}
        </select>
    )
}

export default SelectSectorSin