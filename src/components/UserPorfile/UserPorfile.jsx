import React, { useState, useEffect } from "react";
import styles from './UserPorfile.module.css'
import { connect } from 'react-redux';
import SubCarousel from '../SubCarousel/SubCarousel' // Diego: Este es el correcto, cambienle el nombre a sus carpetas
// import SubCarousel from '../subCarousel/SubCarousel' <-------- Este no jeje
import axios from 'axios';
import Event from "../PromotorePorfile/Event";

const UserPorfile = ({ userState }) => {
    console.log(userState)
    const id = userState.id
    const [info, setInfo] = useState()
    let favs;
    useEffect(() => {
        const users = async () => {
            let data;
            try {
                data = await axios.get(`https://event-henryapp-backend.herokuapp.com/api/user/${id}`)
                data.data.favorite.forEach((e) => {
                    favs = JSON.parse(e)
                })
                setInfo(favs)
            } catch (error) {
                console.log(error)
            }
        }
        users()
    }, [])

    return (
        <div className={styles.contain}>
            <div className={styles.barProfile}>
                <div className={styles.profileImg}>
                    <img src={userState.picture} alt="xx" />
                </div>
                {/* <h3 className={styles.nombre}>{userState.name}</h3>
                <h4 className={styles.ciudad}>Bogotá, Colombia</h4> */}
            </div>
            <div className={styles.contInfo} >
                <h3>¡Bienvenido! {userState.username}</h3>
            </div>


            <div className={styles.favorites}>
                <h3>Siguiendo:</h3>
                    <SubCarousel />
                    { /* (Lucio) Cuanto antes quitarle el hardcodeo a todo esto */ }
            </div>

            <div className={styles.myEvents}>
                {info?
            <div>
                <Event props={info} />
            </div>
            :<span></span>
                }
            {/* <div className={styles.myEvents}>
                <h3>Mis Eventos</h3>
                    <SubCarousel />
            </div>
            <div className={styles.favorites}>
                <h3>Eventos Favoritos</h3>
                    <SubCarousel />
            </div> */}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        userState: state.userState
    }
}

export default connect(mapStateToProps, null)(UserPorfile)