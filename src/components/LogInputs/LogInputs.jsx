import React from "react";
import styles2 from "../FormPromoter/Forms.module.css";

const LogInputs = ({
  styles,
  FormState,
  upgradeEmail,
  upgradePass,
  SwitchMail,
  SwitchPass,
  MessageMail,
  MessagePass,
  responseGoogle,
  GoogleLogin,
  Link,
  nameComponent,
}) => {
  return (
    <>
      <span className="formTitle">{nameComponent}</span>
{/*       <div className={styles2.contForm2}> */}
      <div className={styles.subContainer}>
      <div className={styles2.contForm2}>
           <div className={styles2.row}>
            <span>Email</span>
            <div className={styles2.inputCheck}>
              <input
                type="email"
                onChange={upgradeEmail}
                value={FormState.email}
                name="email"
              />
              <span className={SwitchMail ? styles.true : styles.false}>
                {MessageMail}
              </span>
            </div>
          </div>
          <div className={styles2.row}>
            <span>Contraseña</span>
            <div className={styles2.separator}></div>
            <div className={styles2.inputCheck}>
              <input
                type="password"
                onChange={upgradePass}
                value={FormState.password}
                name="password"
              />
              <span className={SwitchPass ? styles.true : styles.false}>
                {MessagePass}
              </span>
            </div>
          </div>
          <div className={styles.center}>
          {true ? (
            <button className="regularBtn" type="Submit">
              Ingresar
            </button>
          ) : (
            <button className="regularBtn">Ingresar</button>
          )}
          </div>
        </div>
        <div className="margTop10">
          <GoogleLogin
            clientId="327106027037-3kc6htgt6l0goeueh2nhmtktm7t6mnb6.apps.googleusercontent.com"
            buttonText="Ingresa con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            // render={renderProps => (
            //   <button className="regularBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
            // )}
          />
        </div>
        <span className="margin5">o bien...</span>
        <Link to="/registration">
          <button className="regularBtn">Crea tu cuenta</button>
        </Link>
      </div>
{/*       </div> */}

      {/* 
<div className={styles.subContainerTwo}>
<FacebookLogin
appId="226871852734478"
autoLoad={true}
fields="name,email,picture"
onClick={responseFacebook}
callback={responseFacebook}
/>
</div> */}
    </>
  );
};

export default LogInputs;
