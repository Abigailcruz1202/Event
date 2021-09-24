import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { filterTags, filterAgeRating, filerWeekdays, getEvents, removeFilters } from '../../actions/actions';
import styles from './Filter.module.css';

//tags -- age_rating

export function Filters(props) {
    // console.log(props)
    const stateFilters = useSelector(state => state.filters)
    const tags = ["Exteriores", "Interiores", "En vivo", "Recital", "Teatro", "Película", "Disco", "Deportes"]
    const age_rating = ["0+", "7+", "13+", "18+"]
    const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const countrys = ['México', 'Colombia', 'Argentina']
    const ESTADOS = ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas']
    const DEPARTAMENTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada']
    const PROVINCIAS = ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']

    const [country, setCountry] = useState()
    const get = props.getEvents
    useEffect(() => {
        props.getEvents()
    }, [get])
    // const [type, setType] = useState()

    const handleChange = (e) => {
        console.log(e.target.name, 'pruebaaaaaa', e.target.value)
        props.filterTags(e.target.value)
    }
    const ageRatingChange = (e) => {
        props.filterAgeRating(e.target.value)
    }
    const weekdaysChange = (e) => {
        props.filerWeekdays(e.target.value)
    }
    const change = (e) =>{
        setCountry(e.target.value)
    }
    const all = (e) => {
        props.removeFilters()
    }
    return (
        <div className={styles.divFilters}>
            <h5 style={{ marginBlockEnd: '0', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Eliminar Filtros</h5>
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Tipos de eventos:</h5>
            
            {tags.map((e, i) => {
                return <option className={styles.options} key={i} name='tags' value={e} onClick={handleChange}>{e}</option>
            })}
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Clasificación:</h5>

            {age_rating.map((e, i) => {
                return <option className={styles.options} key={i} name='age_rating' value={e} onClick={ageRatingChange}>{e}</option>
            })}
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Días:</h5>

            {weekdays.map((e, i) => {
                return <option className={styles.options} key={i} name='weekdays' value={e} onClick={weekdaysChange}>{e}</option>
            })}
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>País:</h5>

            {countrys.map((e, i) => {
                return <option className={styles.options} key={i} name='country' value={e} onClick={change}>{e}</option>
            })}
            {country === 'Argentina' ?
                <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Provincia:</h5>

                    {PROVINCIAS.map((e, i) => {
                        return <option className={styles.options} key={i} name='region' value={e} onClick={weekdaysChange}>{e}</option>
                    })}</>
                : country === 'México' ?
                    <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Estado:</h5>

                        {ESTADOS.map((e, i) => {
                            return <option className={styles.options} key={i} name='region' value={e} onClick={weekdaysChange}>{e}</option>
                        })}</>
                : country === 'Colombia' ?
                    <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Departamento:</h5>
                            {DEPARTAMENTOS.map((e, i) => {
                                return <option className={styles.options} key={i} name='region' value={e} onClick={weekdaysChange}>{e}</option>
                            })}</>
                : null
            }

        </div>
    )
}
export default connect(null, { filterTags, filterAgeRating, getEvents, filerWeekdays, removeFilters })(Filters)