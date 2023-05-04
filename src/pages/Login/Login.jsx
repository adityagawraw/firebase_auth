import React, { useState } from "react";
import classes from "./Login.module.css";
import { app } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
const Login = () => {
  const [login, setLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const auth = getAuth();
  const handleLoginViaEmail = (e) => {
    e.preventDefault();
    !login
      ? createUserWithEmailAndPassword(
          auth,
          loginData.email,
          loginData.password
        )
          .then((res) => alert(res.user))
          .catch((err) => alert(err.message))
      : signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then((res) => alert(res.user))
          .catch((err) => alert(err.message));
  };
  const googleProvider = new GoogleAuthProvider();
  const signinWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => alert(res.user))
      .catch((err) => alert(err.message));
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.userAuth}>
        {login ? (
          <p className={classes.heading}>Login to your Account </p>
        ) : (
          <p className={classes.heading}>Register for Account</p>
        )}

        <form onSubmit={handleLoginViaEmail}>
          <div className={classes.input}>
            <p> Email</p>
            <input
              placeholder="Enter your email address"
              onChange={(e) =>
                setLoginData((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
              type="email"
              className={classes.inputfield}
            />
          </div>
          <div className={classes.input}>
            <p>Password</p>
            <input
              placeholder="Enter your password"
              onChange={(e) =>
                setLoginData((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
              type="password"
              className={classes.inputfield}
            />
          </div>
          <button className={classes.loginButton}>
            {login ? <div>Sign In</div> : <div>Sign up</div>}
          </button>
        </form>
        {login ? (
          <button
            className={classes.changeLogin}
            onClick={() => setLogin(false)}
          >
            Create a new Account
          </button>
        ) : (
          <button
            className={classes.changeLogin}
            onClick={() => setLogin(true)}
          >
            Login to existing Account
          </button>
        )}
        <p>OR</p>
        <button className={classes.withgoogle} onClick={signinWithGoogle}>
            <img src="/image/googlepic.png" alt=""  className={classes.withgoogleImg}/>
            Sign up with Google</button>
      </div>
    </div>
  );
};

export default Login;
