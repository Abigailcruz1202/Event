import {Link} from 'react-router-dom'
import styles from './PerfilPromoterUsuario.module.css'

function Pais ({props}){
    
    let { name,pictures,id}=props
    console.log( 'soy props',props)
     let foto = props.pictures[0]
     console.log('hola soy foto',foto)

    return(
        <>
        <div>
        <div className={styles.card}>
            <Link to ={`/eventDetailsUsuario/${id}`} className='link'>
           <img src={foto} className={styles .imgCard} />
                 
                 
             <h5 className={styles .titleCard}>{name}</h5>
             
                 

                 
             
          

            </Link>
        </div>
        </div>
        
        </>
    )
}
 export default Pais 