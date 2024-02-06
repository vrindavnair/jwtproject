import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const navigate=useNavigate()

    axios.defaults.withCredentials=true
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:9001/login`,{email,password})
        .then(res=>{
            console.log("login:" + res.data)
            if(res.data.Status === "Sucess"){
                if(res.data.role==="admin"){
                    navigate('/dashboard')
                }else{
                    navigate('/')
                }
            }
        }).catch(err=>console.log(err))
    }

    const handleEmail=(e)=>{
        let em=e.target.value
        setEmail(em)
    }
    const handlePassword=(e)=>{
        let p=e.target.value
        setPassword(p)
    }



  return (
    <div style={{textAlign:"center",marginTop:"10rem"}}>

    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type='email'name='email' placeholder='email' onChange={handleEmail}/><br/>
            <input type='password' name='password' placeholder='password' onChange={handlePassword}/><br/>
            <button type="submit">submit</button>


        </form>



    </div>
    </div>
  )
}

export default Login