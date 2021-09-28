import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { filterCountry, filterProvince, filterTags, filterAgeRating, filterWeekdays, getEvents, removeFilters } from '../../actions/actions';
import styles from './Filter.module.css';

//tags -- age_rating

export function Filters(props) {
    // console.log(props)
    const stateFilters = useSelector(state => state.filters)
    const stateHome = useSelector(state => state.home)

    const tags = ["Exteriores", "Interiores", "En vivo", "Recital", "Teatro", "Película", "Disco", "Deportes"]
    const age_rating = ["0+", "7+", "13+", "18+"]
    const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const countrys = ['México', 'Colombia', 'Argentina']
    const ESTADOS = ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas']
    const DEPARTAMENTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada']
    const PROVINCIAS = ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']

    const [state, setState] = useState([])
    const [country, setCountry] = useState()
    const get = props.getEvents
    useEffect(() => {
        props.getEvents()
    }, [get])

    const handleChange = (e) => {
        console.log('TIPO:', e.target.name)
        let result;
        let val = e.target.value;
        if (e.target.name === 'tags') {
            if (stateFilters.length === 0) {
                result = stateHome.filter((e) => e.tags === val)
                console.log(val, '....¿IF', result)
                props.filterTags(result)
            } else {
                result = stateFilters.filter((e) => e.tags === val)
                console.log(result, 'stateELSE', val)
                props.filterTags(result)
            }
        }
        if (e.target.name === 'age_rating') {
            if (stateFilters.length === 0) {
                result = stateHome.filter((e) => e.age_rating === val)
                console.log(val, '....¿IF', result)
                props.filterAgeRating(result)
            } else {
                result = stateFilters.filter((e) => e.age_rating === val)
                console.log(result, 'state ELSE', val)
                props.filterAgeRating(result)
            }
            // props.filterAgeRating(val)
        }
        if (e.target.name === 'weekdays') props.filterWeekdays(val)

        if (e.target.name === 'country') {
            setCountry(val)
            props.filterCountry(val)
        }
        if (e.target.name === 'province') props.filterProvince(e.target.value)

    }
    const all = (e) => {
        props.removeFilters()
    }
    return (
        <div className={styles.divFilters}>
            <h5 style={{ marginBlockEnd: '0', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Eliminar Filtros</h5>
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Tipos de eventos:</h5>

            {tags.map((e, i) => {
                return <button className={styles.butt} key={i} name='tags' value={e} onClick={handleChange}>{e}</button>
            })}
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Clasificación:</h5>

            {age_rating.map((e, i) => {
                return <button className={styles.butt} key={i} name='age_rating' value={e} onClick={handleChange}>{e}</button>
            })}
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Días:</h5>

            {weekdays.map((e, i) => {
                return <button className={styles.butt} key={i} name='weekdays' value={e} onClick={handleChange}>{e}</button>
            })}
            <h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>País:</h5>

            {countrys.map((e, i) => {
                return <button className={styles.butt} key={i} name='country' value={e} onClick={handleChange}>{e}</button>
            })}
            {country === 'Argentina' ?
                <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Provincia:</h5>

                    {PROVINCIAS.map((e, i) => {
                        return <button className={styles.butt} key={i} name='province' value={e} onClick={handleChange}>{e}</button>
                    })}</>
                : country === 'México' ?
                    <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Estado:</h5>

                        {ESTADOS.map((e, i) => {
                            return <button className={styles.butt} key={i} name='province' value={e} onClick={handleChange}>{e}</button>
                        })}</>
                    : country === 'Colombia' ?
                        <><h5 className={styles.h5Filters} style={{ marginBlockEnd: '0' }}>Departamento:</h5>
                            {DEPARTAMENTOS.map((e, i) => {
                                return <button className={styles.butt} key={i} name='province' value={e} onClick={handleChange}>{e}</button>
                            })}</>
                        : null
            }

        </div>
    )
}
export default connect(null, { filterCountry, filterProvince, filterTags, filterAgeRating, getEvents, filterWeekdays, removeFilters })(Filters)