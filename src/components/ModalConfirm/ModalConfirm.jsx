import React from "react";
import styles from './ModalConfirm.module.css';
import correct from '../../Utilities/successGif.gif'
import ReactDOM  from "react-dom";
import { changeModalConfirm } from "../../actions/actions";
import { connect } from "react-redux";


const ModalConfirm = ({Type, message, changeModalConfirm})=>{
   const closeModal = (response)=>{
        changeModalConfirm(null, null,response)
   }
    return ReactDOM.createPortal(
        <div className={styles.cont}>
            <div className={styles.modalCont}>
                <div className={styles.img}>
                    <img src={correct} alt="" />
                </div>
                <div className={styles.text}>
                    <p>
                        {message}
                    </p>
                </div>
                <button className={styles.btn} onClick={()=>closeModal('si')}>Si</button>
                <button className={styles.btn} onClick={()=>closeModal('no')}>No</button>
            </div>
        </div>,
        document.getElementById("modal")
    )

}

export default connect(null, {changeModalConfirm})(ModalConfirm);