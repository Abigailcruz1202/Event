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
        <label className={styles.label}>Password</label>
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
        <button className="btnForm margTop20" type="Submit">
          Log
        </button>
      ) : (
        <button className={styles.null}>Log</button>
      )}
      <div className="margTop40 ">
        <GoogleLogin
          clientId="376627127490-bk5ds8a9vkmkv2ar8te87qteg0gpivuk.apps.googleusercontent.com"
          buttonText="Ingresa con Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          // render={renderProps => (
          //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
          // )}
        />
        <Link to="/registration">
          <h4 className="txColorWht txAligneCntr margTop40">Crea tu cuenta</h4>
        </Link>
      </div>

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
