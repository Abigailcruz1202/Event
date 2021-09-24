import React, { useState } from "react";
import axios from "axios";
import styles from "./FormUsers.module.css";

export function Validate(input) {
  let errors = {};
  console.log(input, 'validate')
  if (!input.name) {
    errors.name = "*";
  }
  if (!input.last_name) {
    errors.last_name = "*";
  }
  if (!input.username) {
    errors.username = "*";
  }
  if (!input.country) {
    errors.country = "*";
  }
  if (!input.email) {
    errors.email = "*";
  } else
    if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input.email)) {
      // /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      errors.email = "*Correo invalido";
    }
  if (!input.password) {
    errors.password = "*";
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(input.password)) {
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
    errors.password = "Contraseña invalida";
  }
  if (!input.phone) {
    errors.phone = '*'
  }

  return errors;
}

export function FormUsers() {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    birthdate: "",
    photo: "",
    email: "",
    phone: "",
  });
  const handleInputChange = function (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const [img, setImg] = useState('');
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
    setImg(file.secure_url)
    setTimeout(() => setUser({ ...user, photo: file.secure_url }), setLoad(false), 1000)
  }
  const submit = async (e) => {
    e.preventDefault()
    if (user.first_name && user.last_name && user.username && user.email && user.password && user.phone) {
      console.log(user, 'user')
      try {
        const res = await axios.post('http://localhost:3001/api/user/', user)
        alert(res.data.msg)
      } catch (error) {
        console.log('error', error)
      }
      setImg('')
      e.target.reset();
    } else {
      console.log(user, 'user', errors, 'err')
      setErrors(
        Validate({
          ...user,
          [e.target.name]: e.target.value,
        })
      );
    }
    e.target.reset();
    setImg('')
  }

  return (
    <div className={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Formulario de Registro</h2>
      <form
        className={styles.form}
        onSubmit={submit}
      // onSubmit={(e) => {
      // e.preventDefault();
      // if (user.name && user.last_name && user.username && user.country && user.email && user.password && user.phone) {
      //   console.log(user, 'user')
      //   setUser({
      //     name: "",
      //     last_name: "",
      //     username: "",
      //     password: "",
      //     birthdate: "",
      //     photo: "",
      //     country: "",
      //     provStateDepart: "",
      //     city: "",
      //     email: "",
      //     phone: "",
      //   });
      //   setImg('')
      // } else {
      //   console.log(user, 'user', errors, 'err')
      //   setErrors(
      //     Validate({
      //       ...user,
      //       [e.target.name]: e.target.value,
      //     })
      //   );
      // }

      // }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-evenly', width: '70%' }}>
          <div className={styles.divsSection}>
            <label>Nombre: </label>
            <input
              className={errors.first_name && "danger"}
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleInputChange}
              placeholder='Nombre'
            ></input>
            {errors.first_name && <span className="danger">{errors.first_name}</span>}
          </div>
          <div className={styles.divsSection}>
            <label>Apellido: </label>
            <input
              className={errors.last_name && "danger"}
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleInputChange}
              placeholder='Apellido'
            ></input>
            {errors.last_name && <span className="danger">{errors.last_name}</span>}</div>
          <div className={styles.divsSection}>

            <label>Nombre Usuario: </label>
            <input
              className={errors.username && "danger"}
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              placeholder='Nombre de usuario'
            ></input>
            {errors.username && <span className="danger">{errors.username}</span>}</div>
          <div className={styles.divsSection}>

            <label>Foto: </label>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '40%', alignItems: 'center' }}>
              <input type="file" onChange={click} />
              {/* <br /> */}
              {img ?
                load === true ?
                  <span>cargando..</span> : <img src={img} alt='foto' width='150px' height='120px' />
                : null}
              {/* {load === true ? <span>cargando..</span> : <img src={img} alt='foto' width='150px' height='120px' />} */}
            </div>
          </div>
          <div className={styles.divsSection}>

            <label>Fecha de Nacimiento: </label>
            <input style={{ width: '50%' }} type='date' name='birthdate' value={user.birthdate} onChange={handleInputChange} />
          </div>
          <div className={styles.divsSection}>

            <label>Teléfono: </label>
            <input
              className={errors.phone && "danger"}
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder='código de área + número '
            ></input>
            {errors.phone && <span className="danger">{errors.phone}</span>}</div>
          {/* <label>País: </label>
          <input
           className={errors.country && "danger"}
            type="text"
            name="country"
            value={user.country}
            onChange={handleInputChange}
            placeholder='País..'
          ></input> */}
          {/* {errors.country && <span className="danger">{errors.country}</span>}
          <label>Provincia/Estado/Departamento: </label>
          <input
            type="text"
            name="provStateDepart"
            value={user.provStateDepart}
            onChange={handleInputChange}
            placeholder='provincia/stado/departamento'
          ></input>
          <label>Ciudad: </label>
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleInputChange}
            placeholder='Ciudad..'
          ></input> */}
          <div className={styles.divsSection}>

            <label>Correo: </label>
            <input
              className={errors.email && "danger"}
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder='ejemplo123@ejemplo.com'
            ></input>
            {errors.email && <span className="danger">{errors.email}</span>}
          </div>
          <div className={styles.divsSection}>

            <label>Contraseña: </label>
            <input
              className={errors.password && "danger"}
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder='Ejemplo*123'
            ></input>
            {errors.password && <span className="danger">{errors.password}</span>}
          </div>
          <div className={styles.buttonUser} >
            <input className={styles.but} type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
export default FormUsers;