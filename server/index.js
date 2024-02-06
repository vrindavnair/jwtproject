const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const bcrypt=require("bcrypt")
const UserModel=require("./model/User")
const bodyParser=require("body-parser")
const cors=require("cors")
const app=express()
app.use(express.json())

port=9001

app.use(bodyParser.json());
app.use(cookieParser())

// app.use(cors({
//     orgin:["http://localhost:5173/"],
//     methods:["GET","POST"],
//     credentials:true
// }))
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow credentials (cookies, authorization headers)
  }));

const connect=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/vrinda').then((res)=>{
       console.log("connected") 
    }).catch((err)=>{
        console.log(err)
    })
}

const verifyUser=(req,res,next)=>{   //next middleware fun 
    const token=req.cookies.token
    if(!token){
        return res.json("Token is missing")
    }else{
        jwt.verify(token, 'jwt-secret-key',(err,decoded)=>{
            if(err){
                return res.json("error with token")
            }else{
                if(decoded.role=="admin"){
                    next()
                }else{
                    return res.json("not admin")
                }
            }
        })
    }
}

app.get('/dashboard',verifyUser,(req,res)=>{
    res.json("sucess")
})



app.post("/api/register", async(req,res) => {
  
     const {name, email, password} = req.body;
     bcrypt.hash(password,10)
     .then(hash=>{
        UserModel.create({name,email,password:hash})
        .then(user=>res.json("sucess"))
        .catch(err=>res.json(err))
     }).catch(err=>res.json(err))
  

})

app.post('/login',(req,res)=>{
    const {email, password}=req.body
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const token=jwt.sign({email:user.email,role:user.role},
                        "jwt-secret-key",{expiresIn:'1d'})
                        res.cookie('token',token)
                        return res.json({Status: "Success", role: user.role})
                    }else{
                        return res.json("The password is incorrect")
                    }
                
                })
        }else{
            return res.json("no record existed")
        }
    })
})




app.listen(port,()=>{
    console.log(`server running on port ${port}`)
    connect()

})