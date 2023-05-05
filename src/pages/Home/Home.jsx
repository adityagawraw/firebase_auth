import React, { useEffect } from 'react'
import classes from "./Home.module.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const state = useSelector(state=>state.auth);
    const navigate = useNavigate()
    console.log(state.isAuth);
    useEffect(()=>{
        if(!state.isAuth) 
        {
         console.log('navigate to login page')
         navigate('/login');
        }
    },[]);
  
  return (
    <div className={classes.home}>
        Hello World 
    </div>
  )
}

export default Home