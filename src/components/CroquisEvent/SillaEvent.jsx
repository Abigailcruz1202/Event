import React from "react";
import styles from './SillaEvent.module.css'

const SillaEvent =({data, addTicket,fila})=>{
    return(

        <td className={styles.td}>
            
            {data.estado === 'deshabilitado'?<span></span>:
             data.estado === 'no disponible'?<span className={styles.sillaNd}>▇</span>:
                <span className={styles.silla} onClick={()=>addTicket({fila:parseInt(fila),silla:parseInt(data.silla)})}>◛</span>
            }   
                  
        </td>

    )

}

export default SillaEvent