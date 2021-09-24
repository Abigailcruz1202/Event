import { useEffect, useState } from "react";
import axios from 'axios';
import styles from './FormPromoter.module.css';
import validate from './validate.js';
import {connect} from 'react-redux'
import {changeModal} from '../../actions/actions'

function FormPromoter({changeModal}){ 

    const [error, setError] = useState({});
    const [condition, setCondition] = useState({//este estado valida 
        divCountry:'Provicia',// como esta dividido el pais ?
        idNumber:'CUIT',// qu tipo de identificacion maneja el pais
    });
    const [form, setForm] = useState({
        promoter_name:'',//leo:nombre y apellido del promotor//
        promoter_lastName:'',
        bio:'',//
        phone:'',//leo:numero de telefono del promotor//
        email:'',//leo:email del promotor//
        password:'',//leo: contraseña//
        address:'',//dereccion del negocio//
        legal_name:'',//nombre legal//
        tax_id:'',//numero tributario//
        business_type:'',//typo de negocio//
        business_name:'',//
        country:'Argentina',//pais
        state:'',//estado,provincia o departamento
        city:'',//ciudad o municipio
    });

    const businessTypes = [
        'Cine',
        'Bar',
        'Parque de diversiones',
        'Teatro',
        'Espacio público',
        'Salón de Conferencias',
        'Estadio',
        'Otros'
    ];

    useEffect(()=>{
        setError(validate(form))
    },[form])

    const namesInputs = (e)=>{//asiganar caracteristicas por pais
        setForm({...form, country:e.target.value});
        if(e.target.value==='Argentina') {
            setCondition({ ...condition, divCountry:'Provincia', idNumber:'CUIT',});
        }
        else if (e.target.value==='Colombia'){
            setCondition({...condition, divCountry:'Departamento', idNumber:'NIT'});
        }
        else {
            setCondition({...condition, divCountry:'Estado', idNumber:'RFC'});
        }
        handleChange(e)
    }

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let obj = validate(form)
       
        if(Object.keys(obj).length !== 0) {
            changeModal('correct', `Revisa todos los campos`);
        } else {
            try{
                const res = await axios.post('http://localhost:3001/api/promoter',{form})
                console.log('respuesta del backkkkkkkkk',res.data)
                if(res.data.created){
                    changeModal('correct', `Promotor creado con éxito. \n Espere 48hrs para su autorización. Bienvenido a eVent, ${form.promoter_name}!`)
                    setForm({promoter_name:'',
                    promoter_lastName:'',
                    bio:'',
                    phone:'',
                    email:'',
                    password:'',
                    address:'',
                    legal_name:'',
                    tax_id:'',
                    business_type:'',
                    business_name:'',
                    country:form.country,
                    state:'',
                    city:'',
                });
                
                }else{
                    changeModal('correct', `Revisa los datos 'Nombre del negocio', 'Telefono', 'Correo' o '${condition.idNumber}' ya se encuentran registrados.`)
                }
            }catch(error){
                changeModal('correct', `Intentalo de nuevo más tarde`)
            }
        }  
    }

    return (
/*         <div className={styles.container}> */
            <form onSubmit={handleSubmit}>
                <div className={styles.contRend}>
                        <span className={styles.formTitle}>
                            {!form.country ? "Selecciona un país" : "Completa el formulario"}
                        </span>
                    <div className={styles.countrySelect}>
                        <select
                            name="country"
                            value={form.country}
                            onChange={namesInputs}
                            className={styles.pais}
                        >
                            {/* <option value="" disabled>País</option> */}
                            <option value="Argentina" selected='select'>Argentina</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Mexico">México</option>
                        </select>
                        {!error.country &&
                            <span className={styles.tick}> ✓ </span>
                        }
                    </div>
                    {/* {form.country && */}
                        <div className={styles.contForm2}>
                             {/*Ubicacion*/}
                            <div className={styles.ubication}>
                                <div className={styles.row}>
                                    <span>{condition.divCountry}: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='state'
                                            value={form.state}
                                            onChange={handleChange}
                                            className={!form.state && styles.errorState}
                                        />
                                        <span className={styles.tick}>{!error.state && '✓' }</span> 
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Ciudad/Municipio: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='city'
                                            onChange={handleChange}
                                            value={form.city}
                                            className={!form.city && styles.errorState}
                                        />
                                        <span className={styles.tick}>{ !error.city && '✓'}  </span> 
                                    </div>
                                </div>
                            </div>
                             {/*Informacion empresarial*/}
                            <div className={styles.datesCompany}>
                                <div className={styles.row}>
                                    <span >Tipo de Negocio: </span>
                                    <div className={styles.inputCheck}>
                                        <select
                                            name="business_type"
                                            value={form.business_type}
                                            onChange={handleChange}
                                            className={form.business_type}
                                        >
                                            <option value="" disabled>Selecciona:</option>
                                            {businessTypes.map((el) => <option value={el}>{el}</option>)}
                                        </select>
                                        <span className={styles.tick}>{!error.business_type && '✓' }</span>                                 
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Nombre del negocio: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='business_name'
                                            value={form.business_name}
                                            onChange={handleChange}
                                            className={!form.business_name && styles.errorState}
                                        />
                                        <span className={styles.tick}>{!error.business_name && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Razón social: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='legal_name'
                                            onChange={handleChange}
                                            value={form.legal_name}
                                        />                                   
                                        <span className={styles.tick}>{!error.legal_name && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span >{condition.idNumber}: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            name='tax_id'
                                            type="text"
                                            value={form.tax_id}
                                            onChange={handleChange}
                                        />
                                        <span className={styles.tick}>{!error.tax_id && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>                                    
                                    <span>Dirección: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='address'
                                            onChange={handleChange}
                                            value={form.address}
                                        />
                                        <span className={styles.tick}>{!error.address && '✓' }</span>
                                    </div>
                                </div>
                            </div>
                              {/*Contacto*/}
                            <div className={styles.contact}>
                                <div className={styles.row}>
                                    <span>Nombre: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='promoter_name'
                                            onChange={handleChange}
                                            value={form.promoter_name}
                                        />
                                        <span className={styles.tick}>{!error.promoter_name && '✓'} </span> 
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Apellido: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='promoter_lastName'
                                            onChange={handleChange}
                                            value={form.promoter_lastName}
                                        />
                                        <span className={styles.tick}>{!error.promoter_lastName && '✓' }</span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span>Teléfono: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="text"
                                            name='phone'
                                            onChange={handleChange}
                                            value={form.phone}
                                        />                                   
                                        <span className={styles.tick}>{!error.phone && '✓' }</span>
                                    </div>
                                </div>
                            </div>
                              {/*datos login*/}
                            <div className={styles.password}>
                                <div className={styles.row}>
                                    <span >Email: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type='email'
                                            name='email'
                                            placeholder='usuario@dominio.abc'
                                            onChange={handleChange}
                                            value={form.email}
                                        />                                        
                                        <span className={styles.tick}> {!error.email && '✓'} </span>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <span >Contraseña: </span>
                                    <div className={styles.inputCheck}>
                                        <input
                                            type="password"
                                            name='password'
                                            placeholder='¡Si no tilda, no es segura!'
                                            onChange={handleChange}
                                            value={form.password}
                                        />                                        
                                        <span className={styles.tick}>{!error.password && '✓'} </span>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.btn} type="submit">
                            ¡Registrarme!
                            </button>
                        </div>                  
                </div>
            </form>
/*         </div> */
       )
}
function mapStateToProps(state){
    return{
        modal:state.modal
    }
}
export default connect(null,{changeModal})(FormPromoter);

