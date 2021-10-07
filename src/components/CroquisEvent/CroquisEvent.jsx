import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getEventDetail, tiketsSections, changeModal, addShopping } from "../../actions/actions";
import SelectSector from "../Details/EventDetailsUsario/SelectSector";
import styles from './CroquisEvent.module.css'
import FilaEvent from "./FilaEvent";

const CroquisEvent = ({data, modPut, idEvent,detailsEvent,user})=>{
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cartState,)
    const [eventCart, setEventCart] = useState([])
    const ticketsSections = useSelector(state => state.ticketsSections)
    const [croquis, setCroquis] = useState({
        name:'',
        price:'',
        limit:null,
        filas:[],
    });//croquis que renderizo

    // useEffect(()=>{
    //     if(ticketsSections.length){
    //         let eventsAddCroquis = ticketsSections.filter(t=>t.type === true)
    //         console.log(eventsAddCroquis[eventsAddCroquis.length-1].dataUpdate)
    //         data=eventsAddCroquis[eventsAddCroquis.length-1].dataUpdate
    //         console.log(ticketsSections,'ticketsSections')
    //         console.log(data)
    //     }
    // },[croquis])//actualiza la data
    useEffect(()=>{
        setEventCart(cart.filter(e =>  e.id === detailsEvent.id))
    },[cart])
    const [dataUpdate, setDataUpdate] = useState([...data])
    const [tickets, setTickets] = useState({
        sectionName:croquis.name,
        price:croquis.price,
        tickets:[]
    });//tikets selecionados
   
    const addCar = ()=>{//agrega al carrito y envia a redux info del ticket
        const obj={
            id:detailsEvent.id,
            name:detailsEvent.name,
            fullName:user.fullName,
            idUser:user.id,
            promoterId:detailsEvent.promoterId,           
            type:true,//no croquis
            price:tickets.price,
            quantity: tickets.tickets.length,
            nameSection:tickets.sectionName,
            address:detailsEvent.address,
            locationCountry:detailsEvent.location.country,
            locationProvince:detailsEvent.location.province,
            locationCity:detailsEvent.location.city,
            start_date:detailsEvent.start_date,
            schedule:detailsEvent.schedule,
            tags:detailsEvent.tags,
            pictures:detailsEvent.pictures,
            seating:tickets.tickets.map(e => (
                ` F${e.fila}/S${e.silla} `
            )),
            idEvent,
        }
        dispatch(addShopping(obj))
        // setTickets({
        //     sectionName:croquis.name,
        //     price:croquis.price,
        //     tickets:[]
        // })
        // let updateIndex = dataUpdate.findIndex(d=>d.name === croquis.name)
        // let update = dataUpdate
        // update[updateIndex].limit = update[updateIndex].limit -tickets.tickets.length
        // console.log(update)
        // setDataUpdate(
        //     update
        // )    
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
    eventCart.length >= 1? <h3>Este evento ya se agrego al carrito</h3>:
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