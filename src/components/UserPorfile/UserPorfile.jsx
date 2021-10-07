import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './UserPorfile.module.css'
import { connect } from 'react-redux';
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
            <div className={styles.buttonContainer}>
                <Link to={`/tickets/${id}`}>
                    <button>
                        Mis Compras
                    </button>
                </Link> 
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
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        userState: state.userState
    }
}

export default connect(mapStateToProps, null)(UserPorfile)