import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './UserPorfile.module.css'
import { connect } from 'react-redux';
import axios from 'axios';
import ListEvent from "../PromotorePorfile/ListEvent";

const UserPorfile = ({ userState }) => {
    const id = userState.id
    const [info, setInfo] = useState([])
    useEffect(() => {
        const users = async () => {
            let data;
            try {
                data = await axios.get(`https://event-henryapp-backend.herokuapp.com/api/user/${id}`)
                    setInfo(data.data.favorite.map((e)=> JSON.parse(e)))
                    console.log(info,'info')
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
                {/* <h4 className={styles.ciudad}>Bogotá, Colombia</h4> */}
            </div>

            <div className={styles.contInfo} >
                <h3>¡Bienvenido! {userState.username}</h3>
            </div>

                <div className={styles.myEvents}>
                    <h3>Favoritos:</h3>
                    { info ? <ListEvent events={info} user={true}/> : <span></span> }
                </div>

            <div className={styles.favorites}>
                <h3>Siguiendo:</h3>
                { /* (Lucio) Cuanto antes quitarle el hardcodeo a todo esto */}
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
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        userState: state.userState
    }
}

export default connect(mapStateToProps, null)(UserPorfile)