import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getEventDetail, tiketsSections, changeModal, addShopping } from "../../actions/actions";
import SelectSector from "../Details/EventDetailsUsario/SelectSector";
import styles from './CroquisEvent.module.css'
import FilaEvent from "./FilaEvent";

const CroquisEvent = ({data, modPut, idEvent,detailsEvent})=>{
    const dispatch = useDispatch()
    const ticketsSections = useSelector(state => state.ticketsSections)
    const [croquis, setCroquis] = useState({
        name:'',
        price:'',
        limit:null,
        filas:[],
    });//croquis que renderizo

    useEffect(()=>{
        if(ticketsSections.length){
            let eventsAddCroquis = ticketsSections.filter(t=>t.type === true)
            console.log(eventsAddCroquis[eventsAddCroquis.length-1].dataUpdate)
            data=eventsAddCroquis[eventsAddCroquis.length-1].dataUpdate
            console.log(ticketsSections,'ticketsSections')
            console.log(data)
        }
    },[croquis])//actualiza la data

    const [dataUpdate, setDataUpdate] = useState([...data])
    const [tickets, setTickets] = useState({
        sectionName:croquis.name,
        price:croquis.price,
        tickets:[]
    });//tikets selecionados
   
    const addCar = ()=>{//agrega al carrito y envia a redux info del ticket
        dispatch(addShopping(detailsEvent))
        const obj={
            type:true,//croquis?
            dataUpdate,
            info:tickets,
            idEvent,
        }
        dispatch(tiketsSections(obj))
        setTickets({
            sectionName:croquis.name,
            price:croquis.price,
            tickets:[]
        })
        let updateIndex = dataUpdate.findIndex(d=>d.name === croquis.name)
        let update = dataUpdate
        update[updateIndex].limit = update[updateIndex].limit -tickets.tickets.length
        console.log(update)
        setDataUpdate(
            update
        )    
    }
        
    const changeSection = (e)=>{//cuando cambia la seccion se setea el plano del croquis
        let act = data?.find(sec => sec.name === e.target.value)
        setCroquis(act)
        setTickets({
            sectionName:e.target.value,
            price:act.price,
            tickets:[]
        });
        setDataUpdate([...data])
    }

    const addTicket = (puesto)=>{//se agrega ticket al stado local
        setTickets({
            sectionName:croquis.name,
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
            {tickets.tickets.length? 
                <button onClick={addCar}>Agregar al carrito</button>:
                null   
            }
            
               
    </div>
    )
}

export default CroquisEvent