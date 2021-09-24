import React from 'react';
import styles from './ShoppingCart.module.css';
import ShoppingList from '../ShoppingList/ShoppingList';


const ShoppingCart = () => {
const events = [
    {
        id: "1",
        name: "El amor de las luciernagas",
        price: "290",
        tags: "Teatro",
        weekday: ['viernes', 'sabado'],
        picture: ["https://teatro-eidos1.netdna-ssl.com/wp-content/uploads/2012/08/el-amor-de-las-luciernagas-250-191017.jpg",
        "https://i.ytimg.com/vi/dbo9jDeBLcY/maxresdefault.jpg",
        "https://www.dondeir.com/wp-content/uploads/2020/08/el-amor-de-las-luciernagas-obra.jpg",
        "https://i.pinimg.com/originals/ac/f1/51/acf151ffc106a9ce64549fad310b8c3a.jpg",
        "https://i.pinimg.com/originals/ac/f1/51/acf151ffc106a9ce64549fad310b8c3a.jpg",
        "https://i.ytimg.com/vi/U0hyLctYJqQ/maxresdefault.jpg"]
    },
    {
        id: "2",
        name: "Tren Nocturno a Georgia ",
        price: "290",
        tags: "Teatro",
        age_rating: "18+",
        weekday: ['viernes', 'sabado'],
        picture: ["http://2.bp.blogspot.com/-Tu1q8oLpJtk/Tqc1NRn2fwI/AAAAAAAAABI/TDA9YLxcbVM/s320/Tren+nocturno.jpg",
        "https://i.ytimg.com/vi/dbo9jDeBLcY/maxresdefault.jpg",
        "https://www.dondeir.com/wp-content/uploads/2020/08/el-amor-de-las-luciernagas-obra.jpg",
        "https://i.pinimg.com/originals/ac/f1/51/acf151ffc106a9ce64549fad310b8c3a.jpg",
        "https://i.pinimg.com/originals/ac/f1/51/acf151ffc106a9ce64549fad310b8c3a.jpg",
        "https://i.ytimg.com/vi/U0hyLctYJqQ/maxresdefault.jpg"]
    },
    {
        id: "3",
        name: "Cirque du Soleil en México JOYA",
        price: "100",
        tags: "Teatro",
        age_rating: "18+",
        weekday: [ 'sabado'],
        picture: ["https://i.ytimg.com/vi/BFUCMWHCfxk/hqdefault.jpg"]
    },
]

//*Suma de precios
const reducer = (acc, cur) => acc+cur
    const price = events.map(e =>  Number((e.price)))
    const addMoney = (arr) => {
       let plus =   arr.reduce(reducer)
       return plus;
    }
    const result = addMoney(price);

    const imgPruebaCabecera = 'https://media.iastatic.es/ia_img/image/tienda-online_png_770x570_q85.jpg';


    return (
        <div className={styles.container}>
            <img src={imgPruebaCabecera} alt=""  className={styles.imgHead}/>
            <h2>Titulo</h2>
            <div className={styles.subContainer}>
                <div className={styles.list}>
                    <h3>Lista con eventos</h3>
                    <ShoppingList 
                        events={ events }
                    />
                </div>
                <div className={styles.data}>
                    <h3>Datos carritos</h3>
                    <p>Total: { result }</p>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
