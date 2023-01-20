// server - mongodb integration

// import mongoose

const mongoose = require('mongoose');

// 2 state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',{
    useNewUrlParser:true //to avoid warnings
});

// 3 define bank db model
const user=mongoose.model('user',{
    // schema creation
    acno:Number,
    username:String,
    password:String,
    balance:0,
    transaction:[]
});

module.exports={
    user
}

// 4