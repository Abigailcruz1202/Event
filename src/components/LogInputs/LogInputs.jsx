import React from "react";

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
  nameComponent
}) => {
  return (
    <>
      <h4 className={styles.title}>{ nameComponent }</h4>

      <div className={styles.subContainer}>
        <label className={styles.label}>Email</label>
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
      <div className={styles.subContainer}>
        <label className={styles.label}>Contraseña</label>
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
      {true ? (
        <button className="regularBtn" type="Submit">
          Ingresar
        </button>
      ) : (
        <button className="regularBtn">Ingresar</button>
      )}
      <div className="margTop10">
        <GoogleLogin
          clientId="376627127490-bk5ds8a9vkmkv2ar8te87qteg0gpivuk.apps.googleusercontent.com"
          buttonText="Ingresa con Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          // render={renderProps => (
          //   <button className="regularBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
          // )}
        />
              </div>
        <p>o bien...</p>
        <Link to="/registration">
          <button className="regularBtn">Crea tu cuenta</button>
        </Link>


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
