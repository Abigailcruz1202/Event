import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeModal, postEvent } from '../../actions/actions.js';
import styles from './FormEvent.module.css'
import validate from './validate.js';

const regiones = {
    estados:['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
    departamentos:['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'],
    provincias:['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']
}


export function FormEvent(props) {

    const [errors, setErrors] = useState({});
    const [load, setLoad] = useState(false);
    const [event, setEvent] = useState({
        name: '',
        description: '',
        starring: '',
        pictures: [],
        country: 'Argentina',
        divC:'provincias',
        region:'',
        city:'',
        address: '',
        start_date: '',
        finish_date: '',
        isRecurrent:'',
        schedule: [],
        weekdays: [],
        tags: '',
        age_rating: '',
        sectorize:'false',
        sectorsPrice:{},
        moneda:'',
        price: '',
        ticket_limit: '',
        promoter_id: props.promoterId
    })

    const tags = ["Exteriores", "Interiores", "En vivo", "Recital", "Teatro", "Película", "Disco", "Deportes"]
  

    useEffect(()=>{
        setErrors(validate(event))
    },[])
    const click = async (e) => {
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'cloudinary_event')
        setLoad(true)
        const op = { method: 'POST', body: data }
        const res = await fetch(`https://api.cloudinary.com/v1_1/event-pf/image/upload`, op)
        const file = await res.json();
        setEvent({
            ...event,
            pictures:[file.secure_url, ...event.pictures]
        });
        setErrors(validate({
            ...event,
            pictures: [file.secure_url, ...event.pictures]
        }))
        setLoad(false)
    }

    const deletePictures = function (e) {
        e.preventDefault()
        setEvent({
            ...event,
            pictures: event.pictures.filter((i) => i !== e.target.value)
        });
        setErrors(validate({
            ...event,
            pictures: event.pictures.filter((i) => i !== e.target.value)
        }))
    }

    const deleteHour = (hour)=>{
        setEvent({
            ...event,
            schedule: event.schedule.filter((h)=> h!== hour)
        })
    }

    const deleteDay = (day)=>{
        setEvent({
            ...event,
            weekdays: event.weekdays.filter((d)=> d!== day)
        })
    }

    const handleSubmit= async(e)=>{
         e.preventDefault();
         let obj = validate(event)
       
         if(Object.keys(obj).length !== 0) {
             props.changeModal('correct', `Revisa todos los campos`);
         } else {
             try{
                 const res = await axios.post('http://localhost:3001/api/event',event)
                 console.log('respuesta del backkkkkkkkk',res.data)
                 if(res.data.msg){
                    props.changeModal('correct', `Intentalo de nuevo más tarde`) 
                 }
                 else if(res.data.created){
                    props.changeModal('correct', `¡Evento creado con éxito!`)
                     setEvent({
                        name: '',
                        description: '',
                        starring: '',
                        pictures: [],
                        country: 'Argentina',
                        divC:'provincias',
                        region:'',
                        city:'',
                        address: '',
                        start_date: '',
                        finish_date: '',
                        isRecurrent:'',
                        schedule: [],
                        weekdays: [],
                        tags: '',
                        age_rating: '',
                        sectorize:'false',
                        sectorsPrice:{},
                        moneda:'',
                        price: '',
                        ticket_limit: '',
                    });               
                 }else if(!res.data.created){
                     console.log('eyyyyyyyy', res.data.created)
                     props.changeModal('correct', `El Nombre del evento ya se encuentra registrado`)
                 }
             }catch(error){
                props.changeModal('correct', `Intentalo de nuevo más tarde`)
             }
         }
    }

    const inputChange = (e)=>{
        if(e.target.name === 'country'){
            e.target.value === 'Argentina' &&
            setEvent({...event,divC:'provincias',country:'Argentina'});

            e.target.value === 'Colombia' && 
            setEvent({...event,divC:'departamentos',country:'Colombia'});

            e.target.value === 'Mexico' && 
            setEvent({...event,divC:'estados',country:'Mexico'});
        }else if(e.target.name === 'weekdays' ||e.target.name === 'schedule'){
            console.log(e)
            setEvent(
                {...event, [e.target.name]:[...event[e.target.name], e.target.value]
            })
        }else{
            setEvent({
                ...event,
                [e.target.name] : e.target.value
            });  
        }     
        setErrors(validate({
            ...event,
            [e.target.name]: e.target.value
        }))
    }
    let INDEX = 0;
    return (
        <div className={styles.contenedor}>    
            <form className={styles.form}>  
            <h2>Nuevo Evento</h2>              
                <div className={styles.section}>
                    <div className={styles.row}>{/*NOMBRE DEL EVENTO*/}
                        <span>Nombre del Evento: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                type="text"
                                value={event.name}
                                name='name'
                                onChange={inputChange}
                             />
                            <span className={styles.tick}>{!errors.name && '✓'}</span>
                        </div>
                    </div>                   
                    <div className={styles.row}>{/*DESCRIPCION DEL EVENTO*/}
                        <span>Descripción: </span>
                        <div className={styles.inputCheck}>
                            <textarea                              
                                value={event.description}
                                name='description'
                                onChange={inputChange}
                             />
                            <span className={styles.tick}>{!errors.description && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*PARTICIPANTES DEL EVENTO*/}
                        <span>Participantes: </span>
                        <div className={styles.inputCheck}>
                            <textarea
                                value={event.starring}
                                name='starring'
                                onChange={inputChange}
                             />
                            <span className={styles.tick}>{!errors.starring && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*IMAGENES DEL EVENTO*/}                   
                        <span>Imagenes del Evento: </span>                    
                        <div className={styles.inputCheck}>
                            <input 
                                onChange={click}
                                type="file"
                                />
                            <span className={styles.tick}>{!errors.pictures && '✓'}</span>
                        </div>
                    </div>
                    <hr />
                    {event.pictures.length!==0 &&
                    <div className={styles.imagenes}>
                        {event.pictures && event.pictures.map((i) => 
                            <div className={styles.images}>
                                <button  key={INDEX++} value={i} onClick={deletePictures}>
                                    X
                                </button>
                                <img key={INDEX++} src={i} alt='foto' width='150px' height='100px' />
                            </div>
                        )}
                        {load === true ?
                        <span>cargando..</span>
                        : null}
                    </div> 
                    }                      
                </div>
                {/*SECCION UBICACION*/}
                <div className={styles.section}>
                    <div className={styles.row}>{/*PAIS*/}
                        <span>Pais: </span>
                        <div className={styles.inputCheck}>
                            <select 
                                name="country"
                                value={event.country}
                                onChange={inputChange}                               
                            >
                                <option value="Argentina">Argentina</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Mexico">Mexico</option>
                            </select>
                            <span className={styles.tick}>{!errors.country && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*DEPARTAMENTO*/}
                        <span>{event.divC}: </span>
                        <div className={styles.inputCheck}>
                            <select
                                name='region'
                                value={event.region}
                                onChange={inputChange}
                            >
                                {regiones[event.divC].map((region,i)=>
                                    <option key={i} value={region}>{region}</option>
                                )}                                
                            </select>
                            <span className={styles.tick}>{!errors.region && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*CIUDAD*/}
                        <span>Ciudad: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                id={styles.minWidth}
                                type="text"
                                name='city'
                                value={event.city}
                                onChange={inputChange}                                                              
                             />
                            <span className={styles.tick}>{!errors.city && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*ADDRESS*/}
                        <span>Dirección: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                id={styles.minWidth}
                                type="text"
                                name='address'
                                value={event.address}
                                onChange={inputChange}
                                
                             />
                            <span className={styles.tick}>{!errors.address && '✓'}</span>
                        </div>                   
                    </div>
                </div>
                {/*SECCION INFORMACION EVENTO*/}
                <div className={styles.section}>
                    <div className={styles.row}>{/*FECHA INICIO*/}
                        <span>Fecha: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                id={styles.minWidth}
                                type="date"
                                name='start_date'
                                value={event.start_date}
                                onChange={inputChange}                                
                             />
                            <span className={styles.tick}>{!errors.start_date && '✓'}</span>
                        </div>
                    </div>
                    <div className={styles.row}>{/*recurrente*/}
                        <span>Recurrente: </span>
                        <div className={styles.inputCheckRec}>                           
                            <input 
                                type="radio"
                                name='isRecurrent'
                                value={true}
                                onChange={inputChange}
                                
                            />Si <br />  
                            <input 
                                type="radio"
                                name='isRecurrent'
                                value={false}
                                onChange={inputChange}
                                
                            />No <br />                            
                            <span className={styles.tick}>{!errors.isRecurrent && '✓'}</span>
                        </div>
                    </div>
                    {event.isRecurrent === 'true' &&
                        <div className={styles.row}>{/*FECHA FINAL*/}
                             <span>Fecha Final: </span>
                             <div className={styles.inputCheck}>
                                <input 
                                    id={styles.minWidth}
                                    type="date"
                                    name='finish_date'
                                    value={event.finish_date}
                                    onChange={inputChange}                                   
                                 />
                                <span className={styles.tick}>{!errors.finish_date && '✓'}</span>
                            </div>
                        </div>
                    }
                    {event.isRecurrent === 'true' &&
                    <>
                        <div className={styles.row}>{/*HORARIOS*/}
                            <span>Horarios: </span>
                            <div className={styles.inputCheck}>                              
                                <input 
                                    id={styles.minWidth}
                                    type="time"
                                    format = 'HH:mm'
                                    name='schedule'
                                    value={event.schedule[event.schedule.length]}
                                    onBlur={inputChange}                                   
                                 />
                                 {/* <button onClick={()=>addSchedule(hour)}>Add</button>  */}
                                <span className={styles.tick}>{!errors.schedule && '✓'}</span>
                            </div> 
                        </div>  
                        {event.schedule.length!==0 &&
                            <div className={styles.imagenes}>
                                {
                                    event.schedule.map((hour,i)=>
                                        <div key={i} className={styles.etq} >
                                            <div className={styles.inf}>
                                                {hour}
                                            </div>
                                            <div className={styles.x} onClick={()=>deleteHour(hour)}>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>   
                        }                                    
                    </>
                    }
                    {event.isRecurrent === 'true' &&
                    <>
                        <div className={styles.row}>{/*HORARIOS DISPONIBLES*/}
                            <span>Dias: </span>
                            <div className={styles.inputCheck}>
                                <select
                                    name='weekdays'
                                    value={event.weekdays}
                                    onChange={inputChange}
                                   
                                >
                                    <option selected='selected' disabled>seleccione</option>
                                    <option value={'Lunes'}>Lunes</option>
                                    <option value={'Martes'}>Martes</option>
                                    <option value={'Miércoles'}>Miercoles</option>
                                    <option value={'Jueves'}>Jueves</option>Martes
                                    <option value={'Viernes'}>Viernes</option>
                                    <option value={'Sábado'}>Sabado</option>
                                    <option value={'Domingo'}>Domingo</option>
                                </select>
                                <span className={styles.tick}>{!errors.weekdays && '✓'}</span>
                            </div> 
                        </div>
                        {event.weekdays.length!==0 &&
                            <div className={styles.imagenes}>
                                {
                                    event.weekdays.map((day,i)=>
                                        <div className={styles.etq} key={i} >
                                            <div className={styles.inf}>
                                                 {day}
                                            </div>
                                            <div  className={styles.x} key={i} onClick={()=>deleteDay(day)}>
                                            </div>
                                        </div>
                                    )
                                }
                            </div> 
                        } 
                    </>
                    }



                    <div className={styles.row}>{/*TIPO DE EVENTO*/}
                        <span>Tipo de Evento: </span>
                        <div className={styles.inputCheck}>
                            <select
                                name='tags'
                                value={event.tags}
                                onChange={inputChange}
                                className={styles.pais}
                            >
                                <option value='' disabled>seleccione</option> 
                                {tags.map((tag,i)=>
                                    <option key={i} value={tag}>{tag}</option>
                                )}
                            </select>
                            <span className={styles.tick}>{!errors.tags && '✓'}</span>
                        </div>                   
                    </div>
                    <div className={styles.row}>{/*CLASIFICACION*/}
                        <span>Clasificación: </span>
                        <div className={styles.inputCheck}>
                            <select
                                name='age_rating'
                                value={event.age_rating}
                                onChange={inputChange}
                                className={styles.pais}
                            >
                                <option value='' disabled>seleccione</option>                              
                                <option value='0+'>0+</option>
                                <option value='7+'>7+</option> 
                                <option value='13+'>13+</option> 
                                <option value='18+'>18+</option>                                
                            </select>
                            <span className={styles.tick}>{!errors.age_rating && '✓'}</span>
                        </div>                   
                    </div>
                    {/* <div className={styles.row}>
                        <span>Sectorizar: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                type="radio"
                                name='isRecurrent'
                                value='true'
                                onChange={inputChange}
                                className={styles.pais}
                            />Si <br />  
                            <input 
                                type="radio"
                                name='isRecurrent'
                                value='false'
                                onChange={inputChange}
                                className={styles.pais}
                            />No <br /> 
                            <span className={styles.tick}></span>
                        </div>                   
                    </div> */}
                    {/* <div className={styles.row}>}
                        <span>sectores y precios: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                type="text"
                             />
                            <span className={styles.tick}></span>
                        </div>                   
                    </div> */}
                    <div className={styles.row}>{/*SI ANTESRIOR ES NO INGRESE PRECIO GENERAL*/}
                        <span>Precio General: </span>
                        <div className={styles.inputCheck}>
                            <select
                                name='moneda'
                                value={event.moneda}
                                onChange={inputChange}
                                className={styles.pais}
                            >
                                <option value="" disabled>Seleccione Moneda</option>
                                <option value="ARS">ARS</option>
                                <option value="COP">COP</option>
                                <option value="MXN">MXN</option>
                                <option value="USD">USD</option>
                            </select>
                            <input 
                                id={styles.minWidth}
                                type="number"
                                min='0'
                                name='price'
                                value={event.price}
                                onChange={inputChange}
                                placeholder='Precio'
                             />
                            <span className={styles.tick}>{!errors.moneda && !errors.price &&'✓'}</span>
                        </div>                   
                    </div>
                    <div className={styles.row}>{/*LIMITE DE INGRESO*/}
                        <span>Plazas Disponibles: </span>
                        <div className={styles.inputCheck}>
                            <input 
                                type="number"
                                min='0'
                                name='ticket_limit'
                                value={event.ticket_limit}
                                onChange={inputChange}
                             />
                            <span className={styles.tick}>{!errors.ticket_limit && '✓'}</span>
                        </div>                   
                    </div>
                </div>
                <input type='submit' onClick={handleSubmit} /> 
            </form>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        postEvent: (event) => dispatch(postEvent(event)),
        changeModal:(type,msg)=>dispatch(changeModal(type,msg))
    }
}
export default connect(null, mapDispatchToProps)(FormEvent)