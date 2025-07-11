import React, { useContext, useState } from 'react'
import './LoginPop.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPop = ({setshowlogin}) => {

    const {url, setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name : "",
        email : "",
        password : "",
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl = url;
        if(currState === "Login"){
            newUrl += "/api/user/login";
        }else{
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setshowlogin(false)
        }
        else{
            alert(response.data.message);
        }
    }
  
  return (
    <div className='loginpop'>
        <form onSubmit={onLogin} className="loginpop-container">
            <div className="loginpop-title">
                <h2>{currState}</h2>
                <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="loginpop-input">
                {currState === "Login" ? <></> : 
                <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                }
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currState === "Sign up" ? "Create account"  : "Login"}</button>
            <div className='login-pop-conditions'>
                <input type="checkbox" required />
                <p>By continuing , i agree to the terms of use & privacy policy.</p>
            </div>
            {currState === "Login" ?
            <p>Create a new account ? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>:
            <p>Already have an account ? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPop