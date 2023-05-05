import React, { useState } from "react";
import classes from "./Login.module.css";
import { app } from "../../firebaseConfig";
import { login } from "../../features/auth-slice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Login = () => {
  const [signin, setSignin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const handleLoginViaEmail = (e) => {
    e.preventDefault();
    !signin
      ? createUserWithEmailAndPassword(
          auth,
          loginData.email,
          loginData.password
        )
          .then((res) => {
            dispatch(login());
            toast.success("Congrates you hava registered ");
            navigate('/');
            console.log(res.user);
          })
          .catch((err) => {
            toast.error(err.message);
            console.log(err);
          })
      : signInWithEmailAndPassword(auth, loginData.email, loginData.password)
          .then((res) => {
            dispatch(login());
            toast.success("Welcome back !! ");
            navigate('/');
            console.log(res.user);
          })
          .catch((err) => {
            toast.error(err.message);
            console.log(err.message);
          });
  };
  const googleProvider = new GoogleAuthProvider();
  const signinWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then((res) => {
        dispatch(login());
        toast.success("Congrates you hava registered ");
        navigate('/');
        console.log(res.user);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      })
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.userAuth}>
        {signin ? (
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
            {signin ? <div>Sign In</div> : <div>Sign up</div>}
          </button>
        </form>
        {signin ? (
          <button
            className={classes.changeLogin}
            onClick={() => setSignin(false)}
          >
            Create a new Account
          </button>
        ) : (
          <button
            className={classes.changeLogin}
            onClick={() => setSignin(true)}
          >
            Login to existing Account
          </button>
        )}
        <p>OR</p>
        <button className={classes.withgoogle} onClick={signinWithGoogle}>
          <img
            src="/image/googlepic.png"
            alt=""
            className={classes.withgoogleImg}
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
