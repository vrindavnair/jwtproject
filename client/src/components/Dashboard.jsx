import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

    const [suc,setSuc]=useState()
    const navigate=useNavigate()
    axios.defaults.withCredentials=true
    useEffect(()=>{
        axios.get("http://localhost:9001/dashboard")
        .then(res=>{
            console.log("dashboard:"+ res.data)
            if(res.data==="sucess"){
                setSuc("Sucessesed ok")
            }else{
                navigate('/')
            }
        }).catch(err=>console.log(err))
    },[])

  return (
    <div>
       
        <Link to='/register'>Register</Link>
        <p>{suc}</p>
    </div>
  )
}

export default Dashboard