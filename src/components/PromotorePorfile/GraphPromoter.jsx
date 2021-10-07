import React, {useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {Bar} from 'react-chartjs-2';
import axios from 'axios'
import Loading from '../Loading/Loading'
import styles from './GraphPromoter.css'
import {getTickets} from '../../actions/actions'


//[{"id":"6ac312ed-4421-4574-86d7-fec4878a59b8","idUser":"d123cf7a-e1f7-4e21-b425-7f905ade9954","nameUser":"gerardo pedraza","idEvent":"e8dcc0f8-de5a-4f97-8891-b72da18677fb","nameEvent":"el amor de las luciernagas ","price":"290","quantity":"6","total":"1740






function GraphPromoter({events}) {
  console.log('soy lo que me va llegar ',events)
  const id = events.id
  console.log('soy el id llegando a grafica',id)
 
  const [data , setData]=useState()
  const [render, setRender] = useState(false)
  const dispatch= useDispatch()
  const grafica = useSelector(state=>state.grafica)
  console.log('soy la grafica',grafica)

  useEffect( () => {
    const fetchData = async () => {
        try{
            await dispatch(getTickets(id))
            setRender(true)
        }catch(error){
            alert('Algo salio mal al cargar este evento.')
        }
    }
    fetchData()

    
},[id]);

  
 

 





if(render){
//if(grafica.length===0){return console.log('te odio mucho')}else {
  console.log('hola soy la grafica',grafica)
  let datoss= grafica.map((e)=>e.totalVenta)
  console.log('somo el total', datoss )
  let numeroPrecio =[];
  if(datoss.length>0){
    for (let index = 0; index < datoss.length; index++) {
      numeroPrecio.push(parseFloat(datoss[index]))
      
    }
  }
  console.log('ya me transforme',numeroPrecio)
  let etiquetas =grafica.map((e)=>e.nameEvent)
  console.log('somos etiquetas',etiquetas)

//  let labels = data.map((e)=>e.total)
//  console.log('holis tu no se',labels)
// let numeroPrecio = [];
//  console.log('hola soy trans', numeroPrecio)
//    if(labels.length>0){
//      console.log('entre a if ')
//     for (let index = 0; index < labels?.length; index++) {
//         numeroPrecio.push(parseFloat(labels[index]))
//     }
//     //return numeroPrecio;

//   }
   if (numeroPrecio.length>0){
  let datas1 = numeroPrecio?.reduce((a) => a);
  console.log('somo los dtos',datas1)}
//  console.log('hola soy la suma',datas1)
 

  const datas = {
    labels: [etiquetas],
    datasets: [
      {
        legend: {
      display: false},
     label:'Ventas ',
        backgroundColor: '#194358',
        borderColor: '#00171f',
        borderWidth: 1,
        hoverBackgroundColor: '#00b4d8',
        hoverBorderColor: '#f1f1f1',
        data: [numeroPrecio],
         maintainAspectRatio: false,
          fontColor:'#00b4d8',
      }
    ]
  };
  //promotor tiene 2 eventos esos dos eventos tiene ventas entonces 
  //yo necesito id de promoter me llegen el amor de... y evento abi
  // total 
  
  // if(grafica.length===0){
  //   return console.log("no hay")
  // } else {
  return (
    <div className='graphpromoter'>
        <h2 className='prueba'>Ventas</h2>
        <Bar
          data={datas}
         
         
        />
    </div>
  );}
//}
// }
 else{
  return (<Loading/>)
}
}
export default GraphPromoter;


//import styles from './GraphPromoter.css'
// import {Bar} from 'react-chartjs-2'

// export function r(){
     
// const data={
//     type: 'horizontalBar',
//     labels : ['Enero','Febreo','Marzo ','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre', 'Diciembre' ],
//      datasets:[{
//          label:'Ventas en Dolares',
//          backgroundColor:'rgba(0,255,0,3)',
//          borderWidth: 1,
//          hoverBackgroundColor:'rgba(0,255,0,3)',
//          data:['100','200','300','400','500','600','700','800','900','1000','1100','1200']
//      }]
// }
// const opciones ={
//     maintainAspectRatio: false ,
//     responsive:true,
//     scales: {
    
//     ticks: {
//         min: 0,
//         max: 1600,
//         stepSize: 1500
//       },

     

  //}
   
    

//}




//     return (
//         <>
//         <div className={styles.graphpromoter}>
//         <Bar
//         data={data}
//         options={opciones}
          

        
        
        
//         />
//         </div>
//         </>
//     )

// }
// export default GraphPromoter