import React from 'react';
import styles from './Logout.module.css';


const Logout = ({ setOut, setUser, redirec }) => {
    const setNo = () => {
        setOut(false)
    }
    const setLog = () => {
        setUser({});
        redirec('/')
        setOut(false)
    }
    return (
        <div className={styles.container}>
            <p>Estas a punto de cerrar tu sesión</p>
            <p>¿ Estás de acuerdo ?</p>
            <button onClick={setNo} className={ styles.btnNo }>
                No
            </button>
            <button onClick={setLog} className={ styles.btnYes }>
                Si
            </button>
        </div>
    )
}

export default Logout
