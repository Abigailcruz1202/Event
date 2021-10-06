import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getEventDetail } from "../../actions/actions";
import SelectSector from "../Details/EventDetailsUsario/SelectSector";
import styles from './CroquisEvent.module.css'
import FilaEvent from "./FilaEvent";

const CroquisEvent = ({data, modPut, idEvent})=>{
    const dispatch = useDispatch()
    const [dataUpdate, setDataUpdate] = useState([...data])
    const [croquis, setCroquis] = useState({
        name:'',
        price:'',
        limit:null,
        filas:[],
    });//croquis que renderizo
    const [tickets, setTickets] = useState({
        sectionName:croquis.name,
        updateLimit:croquis.limit,
        price:croquis.price,
        tickets:[]
    });//tikets selecionados
    useEffect( () => {
        const fetchData = async () => {
            try{
                dispatch(getEventDetail(idEvent))
            }catch(error){
               console.log(error)
            }
        }
        fetchData()        
    },[croquis]);
 
    const changeSection = (e)=>{
        let act = data.find(sec => sec.name === e.target.value)
        setCroquis(act)
        setTickets({
            sectionName:e.target.value,
            updateLimit:act.limit,
            price:act.price,
            tickets:[]
        });
        setDataUpdate([...data])
    }

    const addTicket = (puesto)=>{
        setTickets({
            sectionName:croquis.name,
            updateLimit:tickets.updateLimit-1,
            price:croquis.price,
            tickets:[...tickets.tickets,puesto]
        });
        const newArray = croquis.filas
        newArray[puesto.fila-1][puesto.silla-1].estado = 'no disponible'
        setCroquis({
            ...croquis,
            filas:newArray
        })
        const index = dataUpdate.findIndex(sec=>sec.name === croquis.name)
        const newData = dataUpdate
        newData[index].filas[puesto.fila-1][puesto.silla-1].estado='no disponible'
        console.log(dataUpdate,'dataaaaaaaaaaaaaaaa')
        setDataUpdate(newData)
    }

    return (
    <div className={styles.contTable}>
            <SelectSector data={data} changeSection={changeSection}/>
            <table>
            <tbody>
                {croquis.filas?.map((fila,i)=>  <FilaEvent 
                                                key={`fila${i+1}`} 
                                                data={fila}
                                                addTicket={addTicket}
                                                fila={i+1}
                                            />)}
            </tbody>   
            </table>
               
    </div>
    )
}

export default CroquisEvent