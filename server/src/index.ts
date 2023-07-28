import { config } from 'dotenv'
config()
import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import bcrypt from "bcrypt"
import AccountModel from './models/Account'
import jwt, { Jwt, JwtPayload } from "jsonwebtoken"

const PORT = 5001
const app = express()

//will tell our app that locally we will allow 
app.use(cors({
    origin: "*"
}))

//this line allows support for json requests
app.use(express.json())

const verifyJWT = (req:Request, res:Response, next: ()=> void) =>{
    const token = req.cookies.token
    if(!token){
        res.send("No token provided with request")
    } else {
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded: Jwt)=>{
            if(err){
                res.send({auth: false, message: "Invalid Token"})
            } else {
                req.body.userId = decoded.userId
                next()
            }
        })
    }
}

app.get("/", (req:Request, res:Response) => {
    res.send("Hello Mike")
})

//checking the login
app.post("/login", async (req:Request, res:Response) => {
    
    //do work here to authenticate
    const accounts = await AccountModel.find({userName: req.body.username})
    console.log(`${accounts[0].userName!} has logged in`)
    if(accounts.length==0){
        res.status(401)
        res.send({"message":"Invalid Username", auth: false})
    } else{
        const result = await bcrypt.compare(req.body.password, accounts[0].password!);
        if(result){
            const userId = accounts[0]._id
            const token = jwt.sign({userId}, "jwtSecret", {
                expiresIn: "5h"
            })
            res.status(200)
            res.cookie("token", token)
            res.send({success:true, auth:true, token: token, account: accounts[0]})
        } else{
            res.status(401)
            res.send({"message":"Invalid Password", auth: false})
        }
    }
})

app.get("/auth", verifyJWT, (req:Request, res:Response) => {
    res.send("Hello Mike")
})

//creating a new account
//the frontend will need to send a post request with the account info in the body in json format
app.post('/signup', async (req: Request, res: Response) => {
    
    const usernames = await AccountModel.find({userName: req.body.userName})
    const emails = await AccountModel.find({userName: req.body.email})
    
    if(usernames.length==0 && emails.length==0){
        console.log("Creating new Account")
        const hash = await bcrypt.hash(req.body.password, 10);
        const newAccount = new AccountModel({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            friends: [],
            chats: [],
            notifications: []
    });
   
    //awaiting this asynchronous call; make the arrow function async
    const createdAccount = await newAccount.save();
    res.send({"success":true})
    //res.json(createdAccount)
    } else {
        res.status(401)
        res.send({"message":"Existing Account Info"})
    }
    
})

//this is the connection to the db cluster
console.log('Connecting to Database')
//exclamation is for ts complaining about the value possibly not being defined
mongoose.connect(process.env.MONGO_URL!).then(()=>{
    console.log(`Listening on port ${PORT}`)
    app.listen(PORT)
})