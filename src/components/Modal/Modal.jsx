import React from "react";
import styles from './Modal.module.css';
import correct from '../../Utilities/successGif.gif'
import incorrect from '../../Utilities/error.png'
import warning from '../../Utilities/spinner.gif'
import ReactDOM  from "react-dom";
import { changeModal } from "../../actions/actions";
import { connect } from "react-redux";


const Modal = ({type, message, changeModal})=>{
   const closeModal = ()=>{
        changeModal(null, null)
   }
    return ReactDOM.createPortal(
        <div className={styles.cont}>
            <div className={styles.modalCont}>
                <div className={styles.img}>
                    {type==='correct'?
                    <img src={correct} alt="" />:
                    type === 'incorrect'?
                    <img src={incorrect} alt="" />:
                    <img src={warning} alt="" />    } 
                </div>
                <div className={styles.text}>
                    <p>
                        {message}
                    </p>
                </div>
                <button className="regularBtn" onClick={closeModal}>Ok</button>
            </div>
        </div>,
        document.getElementById("modal")
    )

}

export default connect(null, {changeModal})(Modal);