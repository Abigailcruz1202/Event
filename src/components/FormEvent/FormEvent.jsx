import React, { useState } from 'react';
import './FormEvent.css'
import { connect } from 'react-redux';
import { postEvent } from '../../actions/actions.js';

const ESTADOS = ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas']
const DEPARTAMENTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada']
const PROVINCIAS = ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']

export function Validate(input) {
    let errors = {};
    // console.log(input, 'validate') /
    if (!input.name) {
        errors.name = '*Campo obligatorio'
    }
    if (!input.description) {
        errors.description = '*Campo obligatorio'
    }
    if (!input.address) {
        errors.address = '*Campo obligatorio'
    }
    if (input.weekdays.length === 0) {
        errors.weekdays = '*Campo obligatorio'
    }
    if (!input.country) {
        errors.country = '*Campo obligatorio'
    }
    if (!input.start_date) {
        errors.start_date = '*Campo obligatorio'
    }
    if (input.schedule.length === 0) {
        errors.schedule = '*Campo obligatorio'
    }
    if (!input.tags) {
        errors.tags = '*Campo obligatorio'
    }
    if (!input.age_rating) {
        errors.age_rating = '*Campo obligatorio'
    }
    if (!input.price) {
        errors.price = '*Campo obligatorio'
    }
    // if (!input.ticket_limit) {
    //     errors.ticket_limit = '*Campo obligatorio'
    // }
    if (input.pictures.length === 0) {
        errors.pictures = '*Campo obligatorio, mínimo 3 imagen'
    }
    if (input.pictures.length === 1 || input.pictures.length === 2) {
        errors.pictures = 'Mínimo 3 imagen'
    }
    if (input.pictures.length > 5) {
        errors.pictures = 'Límite 5 imágenes'
    }
    return errors
}

export function FormEvent(props) {
    const [errors, setErrors] = useState({})
    const [event, setEvent] = useState({
        name: '',
        pictures: [],
        description: '',
        starring: '',
        address: '',
        country: '',
        region:'',
        start_date: '',
        finish_date: '',
        isRecurrent: false,
        schedule: [],
        weekdays: [],
        tags: '',
        age_rating: '',
        price: '',
        ticket_limit: ''
    })
    const [hour, setHour] = useState('')
    const [mins, setMins] = useState('')
    const [day, setDay] = useState()
    const tags = ["Exteriores", "Interiores", "En vivo", "Recital", "Teatro", "Película", "Disco", "Deportes"]
    const weeks = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]//"SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"

    const [img, setImg] = useState([]);
    const [load, setLoad] = useState(false)
    const click = async (e) => {
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'cloudinary_event')
        setLoad(true)
        const op = { method: 'POST', body: data }
        const res = await fetch(`https://api.cloudinary.com/v1_1/event-pf/image/upload`, op)
        const file = await res.json();
        setImg([...img, file.secure_url])
        setTimeout(() => setEvent({ ...event, pictures: [file.secure_url, ...event.pictures] }), setLoad(false), 1000)
    }
    const deletePictures = function (e) {
        e.preventDefault()
        setEvent({
            ...event,
            pictures: event.pictures.filter((i) => i !== e.target.value)
        })
        setImg(img.filter((im) => im !== e.target.value))
    }
    const scheduleInputChange = function (e) {
        if (e.target.name === 'hours') {
            setHour(e.target.value)
        }
        if (e.target.name === 'mins') {
            setMins(e.target.value)
        }
    }
    const scheduleChange = function (e) {
        e.preventDefault()
        if (hour !== '' && mins !== '') {
            if (mins != '00' && mins <= 9) {
                const hours = hour + ':' + '0' + mins
                if (event.schedule.includes(hours)) {
                    alert('No es posible volver a agregar el mismo horario')
                } else {
                    setEvent({
                        ...event,
                        schedule: [hours, ...event.schedule]
                    })
                    setHour('')
                    setMins('')
                }
            } else {
                const hours = hour + ':' + mins
                if (event.schedule.includes(hours)) {
                    alert('No es posible volver a agregar el mismo horario')
                } else {
                    setEvent({
                        ...event,
                        schedule: [hours, ...event.schedule]
                    })
                    setHour('')
                    setMins('')
                }
            }
        }
    }
    const deleteScedule = function (e) {
        e.preventDefault()
        setEvent({
            ...event,
            schedule: event.schedule.filter((d) => d !== e.target.value)
        })
        alert(`Se eliminó '${e.target.value}' de los horarios seleccionados`)
    }
    const weekdaysInputChange = function (e) {
        setDay(e.target.value)
    }
    const weekdaysChange = function (e) {
        e.preventDefault()
        if (event.weekdays.includes(day)) {
            alert('No es posble volver a agregar el mismo día')
        } else if (day !== '') {
            setEvent({
                ...event,
                weekdays: [day, ...event.weekdays]
            })
        }
    }
    const deleteDay = function (e) {
        setEvent({
            ...event,
            weekdays: event.weekdays.filter((d) => d !== e.target.value)
        })
        alert(`Se eliminó '${e.target.value}' de los días seleccionados`)
    }
    const options = function (e) {
        setEvent({
            ...event,
            age_rating: e.target.value
        })
    }
    const eventChange = function (e) {
        console.log(e.target.value)
        setEvent({ ...event, tags: e.target.value })
    }
    const handleInputChange = function (e) {
        if (e.target.value === 'México' || e.target.value === 'Colombia' || e.target.value === 'Argentina' || e.target.value === '') {
            setEvent({ ...event, country: e.target.value })
        } else {
            setEvent({
                ...event,
                [e.target.name]: e.target.value
            });
        }
    }
    const regionChange = function(e){
        setEvent({...event,region:e.target.value})
    }
    const nameChange = function (e) {
        let NAME = e.target.value
        NAME ? NAME = NAME[0].toUpperCase() + NAME.slice(1) : NAME = e.target.value
        setEvent({ ...event, name: NAME })
    }
    let INDEX = 0;
    return (
        <form className='form-event' onSubmit={(e) => {
            e.preventDefault()
            if (event.name, event.description, event.address,
                event.pictures, event.start_date, event.isRecurrent,
                event.weekdays, event.tags, event.age_rating, event.price) {
                setTimeout(() => props.postEvent(event),
                    e.target.reset(),
                    setEvent({
                        name: '',
                        pictures: [],
                        description: '',
                        starring: '',
                        address: '',
                        country: '',
                        region: '',
                        start_date: '',
                        finish_date: '',
                        isRecurrent: false,
                        schedule: [],
                        weekdays: [],
                        tags: '',
                        age_rating: '',
                        price: '',
                        ticket_limit: ''
                    }), setHour(''), setMins(''), setDay(), setImg([]),
                    console.log(event, '¿')
                    , alert(`Se creo correctamente el evento '${event.name}' !`), 1000)
            } else {
                setErrors(Validate({
                    ...event,
                    [e.target.name]: e.target.value
                }))
            }


        }}>
            <div className='container-event'>
                <label>Nombre del Evento: </label>
                <><input className={errors.name && 'danger'} type='text' name='name' value={event.name} onChange={nameChange} placeholder='Nombre del evento' />
                    {errors.name && (<span className="danger">{errors.name}</span>)}</>

                <label>Imagenes: </label>
                <span style={{ fontFamily: 'serif', fontSize: 'smaller' }}>para agregar más imagenes vuelva a elegir otro archivo</span>
                {errors.pictures && (<span className="danger">{errors.pictures}</span>)}

                <div>
                    <input className={errors.pictures && 'danger'} type="file" onChange={click} />
                    <p style={{ fontFamily: 'serif', fontSize: 'smaller', textDecoration: 'underline', margin: 0 }}>esperar que cargue la imagen para seleccionar otra</p>
                    <br />
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', width: '60%' }}>

                        {img && img.map((i) => {
                            return <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <button style={{ position: 'relative', left: '14%' }} key={INDEX++} value={i} onClick={deletePictures}>X</button>
                                <img key={INDEX++} src={i} alt='foto' width='150px' height='100px' />
                            </div>
                        })}
                        {load === true ?
                            <span>cargando..</span>
                            : null}
                    </div>
                </div>

                <label>Descripción: </label>
                <textarea className={errors.description && 'danger'} style={{ width: '50%', height: '50px' }} name='description' value={event.description} onChange={handleInputChange} placeholder='Descripcion..'></textarea>{/* maxlength='300' */}
                {errors.description && (<span className="danger">{errors.description}</span>)}
                <label>Elenco/Participantes: </label>
                <input type='text' name='starring' value={event.starring} onChange={handleInputChange} placeholder='Ejemplo: Michael Jackson, Leonardo DiCaprio..' />

                <label>País: </label>
                {/* <input className={errors.country && 'danger'} type='text' name='country' value={event.country} onChange={handleInputChange} placeholder='pais/provincia(estado,departamento)/ciudad' /> */}
                {errors.country && (<span className="danger">{errors.country}</span>)}
                <select style={{ width: '50%' }} className={errors.country && 'danger'} onChange={handleInputChange}>
                    <option value=''>Seleccionar</option>
                    <option value='México'>México</option>
                    <option value='Colombia'>Colombia</option>
                    <option value='Argentina'>Argentina</option>
                </select>
                {event.country === 'México' ?
                    <>
                        <label> Estados</label>
                        <select style={{ width: '50%' }} onChange={regionChange}>
                        <option value=''>Seleccionar</option>
                            {ESTADOS.map((e) => {
                                return <option key={INDEX++} value={e}>{e}</option>
                            })}
                        </select>
                    </>
                    : event.country === 'Colombia' ?
                        <>
                            <label> Departamentos</label>
                            <select style={{ width: '50%' }} onChange={regionChange}>
                        <option value=''>Seleccionar</option>

                                {DEPARTAMENTOS.map((e) => {
                                    return <option key={INDEX++} value={e}>{e}</option>
                                })}
                            </select>
                        </>
                        : event.country === 'Argentina' ?
                            <>
                                <label> Provincias</label>
                                <select style={{ width: '50%' }} onChange={regionChange}>
                        <option value=''>Seleccionar</option>
    
                                    {PROVINCIAS.map((e) => {
                                        return <option key={INDEX++} value={e}>{e}</option>
                                    })}
                                </select>
                            </>
                            : null
                }
                <label>Dirección: </label>
                <input className={errors.address && 'danger'} type='text' name='address' value={event.address} onChange={handleInputChange} placeholder='Calle Falsa 123 ☺' />
                {errors.address && (<span className="danger">{errors.address}</span>)}
                <label>Fecha de Inicio: </label>
                <input className={errors.start_date && 'danger'} type='date' name='start_date' value={event.start_date} onChange={handleInputChange} placeholder='AAAA/MM/DD' />
                {errors.start_date && (<span className="danger">{errors.start_date}</span>)}

                <label>Recurrente</label>
                <div>
                    <span>Si</span>
                    <input style={{ position: 'relative', width: '10%' }} type='radio' name='isRecurrent' value={true} onChange={handleInputChange} />
                    <span>No</span>
                    <input style={{ position: 'relative', width: '10%' }} type='radio' name='isRecurrent' value={false} onChange={handleInputChange} />
                </div>
                <>
                    <label>Fecha de finalización: </label>
                    <input type='date' name='finish_date' value={event.finish_date} onChange={handleInputChange} placeholder='AAAA/MM/DD' />
                </>

                <label>Horarios: </label>
                <div >
                    <input className={errors.weekdays && 'danger'} style={{ width: '10%' }} type='number' min='1' max='23' name='hours' value={hour} onChange={scheduleInputChange} placeholder='horas' />:
                    <input className={errors.weekdays && 'danger'} style={{ width: '10%' }} type='number' min='0' max='59' name='mins' value={mins} onChange={scheduleInputChange} placeholder='minutos' />
                    <button className='button-event' onClick={scheduleChange}>agregar</button>
                </div>
                {errors.schedule && (<span className="danger">{errors.schedule}</span>)}

                {event.schedule.length !== 0 ?
                    <><span style={{ fontFamily: 'serif', fontSize: 'smaller' }}>si desea eliminar seleccione uno ↓</span>
                        <select style={{ width: '50%' }} onChange={deleteScedule}>
                            <option>Horarios Disponibles</option>
                            {event.schedule.map((e, i) => {
                                return <option key={i}>{e}</option>
                            })}
                        </select></>
                    // OTRA OPCION: ↓↓
                    // <ul>
                    //     {event.schedule.map((e, i) => {
                    //             return <>
                    //             <button value={e} onClick={deleteScedule}>X</button>
                    //             <li key={i}>{e}</li>
                    //             </>
                    //         })}
                    // </ul>
                    : null}

                <label>Días: </label>
                <div>
                    <select className={errors.weekdays && 'danger'} onChange={weekdaysInputChange}>
                        <option value=''>Seleccionar</option>
                        {weeks.map((e, i) => {
                            return <option key={i} value={e}>{e}</option>
                        })}
                    </select>
                    <button className='button-event' onClick={weekdaysChange}>agregar</button>
                </div>
                {errors.weekdays && (<span className="danger">{errors.weekdays}</span>)}

                {event.weekdays.length !== 0 ?
                    <><span style={{ fontFamily: 'serif', fontSize: 'smaller' }}>si desea eliminar seleccione uno ↓</span>
                        <select style={{ width: '50%' }} onChange={deleteDay}>
                            <option>Días Seleccionados</option>
                            {event.weekdays.map((e, i) => {
                                return <option key={i}>{e}</option>
                            })}
                        </select></>
                    : null}
                <label>Tipo de Evento: </label>
                <div>
                    <select className={errors.tags && 'danger'} onChange={eventChange}>
                        <option value=''>Seleccionar</option>
                        {tags.map((e, i) => {
                            return <option key={i} value={e}>{e}</option>
                        })}
                    </select>
                </div>
                {errors.tags && (<span className="danger">{errors.tags}</span>)}

                <label>Clasificación: </label>
                <select style={{ width: '50%' }} className={errors.age_rating && 'danger'} onChange={(e) => options(e)}>
                    <option value=''>Seleccionar</option>
                    <option value='0+'>0+</option>
                    <option value='7+'>7+</option>
                    <option value='13+'>13+</option>
                    <option value='18++'>18+</option>
                </select>
                {errors.age_rating && (<span className="danger">{errors.age_rating}</span>)}
                <label>Precios: </label>
                <input className={errors.price && 'danger'} type='text' name='price' value={event.price} onChange={handleInputChange} placeholder='Ejemplo: $500' />
                {errors.price && (<span className="danger">{errors.price}</span>)}

                <label>Limite de ingresos: </label>
                <input type='text' name='ticket_limit' value={event.ticket_limit} onChange={handleInputChange} placeholder='Ejemplo: 500' />

                <input className='button-event' type='submit' />
            </div>
        </form>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        postEvent: (event) => dispatch(postEvent(event))
    }
}
export default connect(null, mapDispatchToProps)(FormEvent)