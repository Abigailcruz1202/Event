import React, { useState } from 'react';
import styles from './LoginContainer.module.css';
import LoginPromoter from '../LoginPromoter/LoginPromoter';
import LoginUser from '../LoginUser/LoginUser';

const LoginContainer = () => {
    const [Switch, setSwitch] = useState(true)

    //functions
    const setUser = () => {
        setSwitch(true)
    }
    const setPromoter = () => {
        setSwitch(false)
    }
    return (
        <div className={ styles.container }>
            <div>
            <button onClick={ setUser }>Usuario</button>
            <button onClick={ setPromoter }>Promotor</button>
            </div>
            
            {Switch
            ?
            <LoginUser
            nameComponent='Log in Usuario'
                nameComponentOne='Ingresando usuario'
                nameComponentTwo='Usuario no encontrado'
                messageFalse='El usuario no se encuentra registrado'
                messageTwoFalse='o el password no es correcto'
            />
            :
            <LoginPromoter 
            nameComponent='Log in Promotor'
                nameComponentOne='Ingresando Promotor'
                nameComponentTwo='promotor no encontrado'
                messageFalse='El promotor no se encuentra registrado'
                messageTwoFalse='o el password no es correcto'
            />
        }
        </div>
    )
}

export default LoginContainer
