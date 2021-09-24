import React from 'react';
import styles from './Footer.module.css';
import img1 from '../../Utilities/eVent-05.svg';
import img2 from '../../Utilities/eVent-08.svg';

const Footer = () =>{
    return (
        <footer className={styles.Footer}>
            <div className={styles.logo}>
                <h3>Elijan:</h3>
                <img src={img1} alt="eVent" />
                <img src={img2} alt="eVent" />
            </div>
        </footer>
    )
}

export default Footer;