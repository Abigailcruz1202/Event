import React from 'react';
import {Bar} from 'react-chartjs-2';
import styles from './GraphPromoter.css'





const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  datasets: [
    {
      legend: {
    display: false},
   label:'Ventas en Dolares',
      backgroundColor: '#194358',
      borderColor: '#00171f',
      borderWidth: 1,
      hoverBackgroundColor: '#00b4d8',
      hoverBorderColor: '#f1f1f1',
      data: [65, 59, 80, 81, 56, 55, 40,52,68,74,85,55],
       maintainAspectRatio: false,
        fontColor:'#00b4d8',
    }
  ]
};
function GraphPromoter() {
  return (
    <div className='graphpromoter'>
        <h2 className='prueba'>Ventas</h2>
        <Bar
          data={data}
         
         
        />
    </div>
  );
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