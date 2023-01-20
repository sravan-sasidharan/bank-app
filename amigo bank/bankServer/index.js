// server creation

// 1 import express
const express = require('express')

// import dataService
const dataService= require('./service/dataService')

// import jwt token
const jwt= require('jsonwebtoken')
// import cors
const cors = require('cors')

// 2 create an app using the express

const app = express()

// give command to a data vis cors

app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:8080']
}))

// To parse JSON from req body
app.use(express.json());

// 3 create port number
app.listen(3000,()=>{
    console.log('server listening on port 3000')
})



// application specific middleware
const appMiddleware =(req, res, next) =>{
    console.log('app specific middleware');
    next()
}

app.use(appMiddleware)

// Router Specific middleware

const jwtMiddleware = (req, res, next) =>{
    try{

    
        const token= req.headers['x-access-token'];
        console.log('router specific middleware');
        const data = jwt.verify(token,'superkey2022');
        console.log(data);
        next();
    }

catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:'please login first'
    })
}}


// 4 resolving HTTP requests

// GET method- TO GET DATA
// app.get('/', (req, res) => {
//     res.send('GET method')
// })

// // POST method - TO CREATE DATA

// app.post('/', (req, res) => {
//     res.send('POST method')
// })

// PUT method - TO UPDATE DATA COMPLETLY

// app.put('/', (req, res) => {
//     res.send('PUT method')
// })

// //DELETE method - TO DELETE DATA

// app.delete('/', (req, res) => {
//     res.send('DELETE method')
// })

// // PATCH method -TO UPDATE DATA PARTIALLY

// app.patch('/', (req, res) => {
//     res.send('PATCH method')
// })

// api calls
// login
// register
// deposit
// withdraw
// delete
// transaction history


// Resolving register requests

app.post('/register', (req, res) => {
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statuscode).json(result);
    })
    // if(result){
    //     res.send('successful')

    // }else{
    //     res.send('user registration failed')

    // }

});

// Resolving login requests

app.post('/login', (req, res) => {
    console.log(req.body);
    dataService.login(req.body.acno,req.body.password)
    .then(result => {
        res.status(result.statuscode).json(result);
    })    
});

// Resolving deposit requests


app.post('/deposit',jwtMiddleware, (req, res) => {
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result => {
        res.status(result.statuscode).json(result);
    })
    
});

// Resolving withdraw requests


app.post('/withdraw',jwtMiddleware, (req, res) => {
    console.log(req.body);
    dataService.withdraw(req,req.body.acno,req.body.password,req.body.amount)
    .then(result => {
        res.status(result.statuscode).json(result);
    })
});

// Resolving transaction requests

app.post('/transaction',jwtMiddleware, (req, res) => {
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result =>{
        res.status(result.statuscode).json(result);
    })
});

app.delete('/deleteAcc/:acno',(req, res) =>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
    });