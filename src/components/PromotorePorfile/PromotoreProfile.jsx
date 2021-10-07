import React, { useEffect,useState } from "react";
import ListEvent from "./ListEvent";
import {Bar} from 'react-chartjs-2';
import Grafica from  './GraphPromoter'
import styles from './PromotorePorfile.module.css';
import {Link} from 'react-router-dom'
import { getEventPromoter,getTickets } from "../../actions/actions";
import { connect, useDispatch} from 'react-redux';
import Loading from '../Loading/Loading'

const PromotorePorfile = ({userData, getEventPromoter, promoterEvents,getTickets,grafica}) =>{
const dispatch=useDispatch()
   //const [render, setRender] = useState(false)

    useEffect(()=>{
         

        const getEvents = async()=>{
            try{
            const events = await getEventPromoter(userData.id)
            return events
            }catch(error){
                console.log(error)
                return error
            }
        }
        const eventos = getEvents()
    },[])
   
    // useEffect( () => {
    //     const fetchData = async () => {
    //         try{
    //             await dispatch(getTickets(userData.id))
    //             //setRender(true)
                
    //         }catch(error){
    //             alert('Algo salio mal al cargar este evento.')
    //         }
    //     }
    //     fetchData()
    
        
    // },[userData]);
    // console.log('holis soy graf ',grafica)



//if(render){
//     console.log('hola soy la grafica',grafica)
//   let datoss= grafica.map((e)=>e.totalVenta)
//   console.log('somo el total', datoss )
//   let numeroPrecio =[];
//   if(datoss.length>0){
//     for (let index = 0; index < datoss.length; index++) {
//       numeroPrecio.push(parseFloat(datoss[index]))
      
//     }
//   }
//   console.log('ya me transforme',numeroPrecio)
//   let etiquetas =grafica.map((e)=>e.nameEvent)
//   console.log('somos etiquetas',etiquetas)
//   let datas1 = numeroPrecio.reduce((a) => a);
//   console.log('somo los dtos',datas1)
// //  console.log('hola soy la suma',datas1)
 

//   const datas = {
//     labels: [etiquetas],
//     datasets: [
//       {
//         legend: {
//       display: false},
//      label:'Ventas ',
//         backgroundColor: '#194358',
//         borderColor: '#00171f',
//         borderWidth: 1,
//         hoverBackgroundColor: '#00b4d8',
//         hoverBorderColor: '#f1f1f1',
//         data: [numeroPrecio],
//          maintainAspectRatio: false,
//           fontColor:'#00b4d8',
//       }
//     ]
//   };


    return(
        <div className={styles.contPrin}>
            <div className={styles.contProfile}>
                <div className={styles.imgProfile}>
                    <img src={userData.picture} alt="" />
                </div>
            </div>
            <div className={styles.contInfo} >
                <h3>{userData.business_type} {userData.business_name}</h3>
            </div>
            <hr/>
            
            <div className={styles.contEvents}>
                <div className={styles.barEvent}>  
                    <h4>Mis Eventos</h4>
                    <Link to='/FormEvent' className={styles.link}>              
                        <button className={styles.btnAddEvent}>
                            Nuevo Evento 
                        </button>     
                    </Link>           
                </div>
            
                <ListEvent events={promoterEvents}/>
                <Grafica events ={userData}/>
                

            </div>

            {/* <div className='graphpromoter'>
                
        <h2 className='prueba'>Ventas</h2>
        <Bar
          data={datas}
         
         
        />
    </div> */}
    {/* <div>
            {(()=>{
                if(grafica===0){
                return(<h1>No hay ventas </h1>)
            }else if(grafica>0){
                return(
                    console.log('entre'),
                <Grafica events ={userData}/>)
            }
            
            })()}
            </div> */}

        </div>
    );
}

// else{
//     return (<Loading/>)
//   }
// }
function mapStateToProps(state){
    return {
        promoterEvents:state.promoterEvents,
        //grafica:state.grafica
    }
}

export default connect(mapStateToProps,{getEventPromoter})(PromotorePorfile)