import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import success from '../../../Utilities/successGif.gif'
import style from './CreateComment.module.css'

//Diego: Componente de creacion de comentarios. Falta obtener dinamicamente user_id.
export default function CreateComment() {
    const [editing, setEditing] = useState(true)
    const [input, setInput] = useState({
        review: '',
        rating: '',
        user_id: '1',
        event_id: '',
        checkbox: false,
    })

    // const userInfo = useSelector(state => state.userState)
    // console.log(userInfo, 'esto es lo que me llega de Google en mi create comment')

    const location = useLocation()

    useEffect(() => {
        setInput({
            ...input,
            event_id: location.state.id,
            // user_id: aqui iria el ID que me llega por estado de redux
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    function handleChange(e){
        if (e.target.name === 'checkbox') {
            setInput({
                ...input,
                checkbox: !input.checkbox
                });
        }
        else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
                });
        
        }
    }

    // Diego: Funcion para revisar que el usuario no haya comentado anteriormente
    let userCheck=[]
    async function fetchUserComments(id){
        const response = await axios.get(`http://localhost:3001/api/comment/all`)
        userCheck = response.data.filter(comment => Number(comment.userId) === Number(id))
        }

    async function handleSubmit(e){
        e.preventDefault();
        const { review, rating, user_id, event_id, checkbox } = input
        if (!rating || !review) return alert('Todos los campos son requeridos.')
        else if (review.length < 40) return alert('El comentario debe tener un mínimo de 40 caracteres.')
        else if (!checkbox) return alert('Es necesario que confirmes que tu comentario sigue nuestras normas.')
        else {
                // await fetchUserComments(user_id)
                // if (userCheck.length) return alert('Solamente puedes crear un comentario por evento.')
                // else {
                    axios.post('http://localhost:3001/api/comment', {
                        review,
                        rating,
                        user_id,
                        event_id
                    })
                    setEditing(false)           
            // }
        }
    }
    return (
        <div className={style.newCommentWrapper}>
            {
                editing ? (
                    <div className={style.newComment}>
                        <h2 className={style.newCommentTitle}>Agregar Comentario:</h2>
                        <form className={style.newCommentForm} onSubmit={e => handleSubmit(e)}>
                            <p>¡Cuéntanos cómo te fue en <b>{location.state.eventName.trim()}</b>!</p>
                            <label> Calificacion*: </label>
                            <input name='rating' type="number" min='1' max='5'  onChange={e => handleChange(e)}/>
                            <br />
                            <label> Comentario*: </label>
                            <input name='review' onChange={e => handleChange(e)}/>
                            <br />
                            <br />
                            <li className={style.confirmation}>
                                <p className={style.newCommentConfirmation}>
                                <input type="checkbox" name='checkbox' className={style.newCommentCheckbox} onChange={e => handleChange(e)}/>
                                Confirmo que mi comentario respeta las normas del sitio.
                                </p>
                            </li>
                            <br />
                            <button type='submit' className={style.newCommentButton}>Enviar</button>                            
                        </form>
                    </div>
                ) : (
                    <div className={style.newCommentSuccess}>
                        <img className={style.newCommentSuccessImg}src={success} alt="Fue un éxito." />
                        <p>Gracias por compartir tu opinión!</p> 
                        <Link to={`/eventDetailsUsuario/${input.event_id}`}>
                            <button className={style.newCommentButton}>Listo</button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

