const jwt= require('jsonwebtoken')

// import db.js

const db=require('./db')


  userDetails={
    1000:{acno:1000,username:'Allwin',password:1000,balance:10000,transaction:[]},
    1001:{acno:1001,username:'fayas',password:1001,balance:10000,transaction:[]},
    1002:{acno:1002,username:'Jishna',password:1002,balance:10000,transaction:[]},
  }


  const register=(acno,username,password)=>{
    return db.user.findOne({acno})//port 27017
    .then(user=>{
      if(user){
        return{
          statuscode:401,
          status:false,
          message:'User already registered'
        }
      }
      else{
        const newUser= new db.user({
          acno,
          username,
          password,
          balance:0,
          transaction:[]
        }) 
        newUser.save()//to save mongodb
        return{
          statuscode:200,
          status:true,
          message:'Successfully registered'
        }
      }
    })

    // if(acno in userDetails){
    //   return{
    //     statuscode: 401,
    //     status:false,
    //     message:'Username already exists'

    //   }

    // }
    // else{
    //   userDetails[acno]={
    //     acno,
    //     username,
    //     password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   console.log(userDetails);
    //   return {
    //     statuscode: 200,
    //     status:true,
    //     message:'successfully registered'

    //   }
    // }
  }

  

const login=(acno,password)=>{

  return db.user.findOne({acno,password})
  .then((user)=>{
    if(user){
    currentUser = user.username;
    currentAcno = acno;
    const token = jwt.sign({currentAcno:acno},'superkey2022')
    return {
      statuscode: 200,
      status:true,
      message:'Login Successful',
      currentAcno,
      currentUser,
      token
    }
  }
  else{
    return{
      statuscode:400,
      status:false,
      message:'Login Failure'
    }
  }
}
  )}
  // var userDetails=this.userDetails;
//   if(acno in userDetails){
//     if(password==userDetails[acno].password){
//       currentuser=userDetails[acno].username;
//       currentAcno=acno;
//       const token=jwt.sign({currentAcno:acno},'superkey2022')
//       return {
//         statuscode: 200,
//         status:true,
//         message:"login successful",
//         currentAcno,
//         currentuser,
//         token
//       }
//     }
//     else{
//       // alert("incorrect password");
//       return {
//         statuscode: 401,
//         status:false,
//         message:"incorrect password"
//       }
//     }
    
//   }
//   else{
//     // alert("invalid account number");
//     return {
//       statuscode: 401,
//       status:false,
//       message:"invalid account number"

//     }
    
//   }
// }



const deposit=(acno,pswd,amt)=>{
  // var userDetails=this.userDetails;
  var amount=parseInt(amt)
  return db.user.findOne({acno,password:pswd})
  .then(user=>{
    if(user){
    user.balance+=amount;
    user.transaction.push({
      type: 'credit',
      amount
    })
    user.save();
    return{
      statuscode:200,
      status:true,
      message:`${amount} is credited.......balance is ${user.balance}`
    }
  }
  else{
    return{
      statuscode:401,
      status:false,
      message:`incorrect password`
  }
}
  })
}
//   if(acno in userDetails){
//     if(password==userDetails[acno].password){
//       userDetails[acno].balance+=amount;
//       userDetails[acno].transaction.push({
//         type:'Credit',
//         amount
//       })
//       console.log(userDetails);
//       // this.saveDetails();
//       return {
//         statuscode: 200,
//         status:true,
//         message:`${amount} is credited and balance is ${userDetails[acno].balance}`
//         // userDetails[acno].balance;
//     }
//   }
//     else{
//       // alert("password invalid");
//       return{
//         statuscode: 401,
//         status:false,
//         message:"incorrect password"

//       }
//     }
//   }else{
//     // alert("invalid account details");
//     return {
//       statuscode: 401,
//       status:false,
//       message:"invalid account details"
//     }
//   }

// }

const withdraw=(req,acno,pswd,amt)=>{
    // var userDetails=this.userDetails;
    var amount=parseInt(amt)
    return db.user.findOne({acno,password:pswd})
  .then(user=>{
    if(user){
      if(user.balance>amount){
      user.balance-=amount;
      user.transaction.push({
        type: 'debit',
        amount
      })
      user.save();
      return{
        statuscode:200,
        status:true,
        message:`${amount} is debited.......balance is ${user.balance}`
      }
    }else{
      return{
        statuscode:401,
        status:false,
        message:"insufficient funds"
      }
    }
    }
    else{
      return{
        statuscode:401,
        status:false,
        message:`incorrect user details`
    }
  }
  })
}







  //   if(acno in userDetails){
  //     if(password==userDetails[acno].password){
  //       if(amount<=userDetails[acno].balance){
  //       userDetails[acno].balance-=amount;
  //       userDetails[acno].transaction.push({
  //         type:'Debit',
  //         amount
  //       })
  //       console.log(userDetails);
  //       // this.saveDetails();
  //       return {
  //         // userDetails[acno].balance;
  //         statuscode: 200,
  //         status:true,
  //         message:`${amount} is debited and balance is ${userDetails[acno].balance}`
  //       }
  //       }else{
  //         // alert("insufficient balance");
  //         return {
  //           statuscode: 401,
  //           status:false,
  //           message: 'Insufficient balance'
  //         }
  //       }
  //     }
  //     else{
  //       // alert("password invalid");
  //       return{
  //         statuscode: 401,
  //         status:false,
  //         message:"incorrect password"
  //       }
  //     }
  //   }else{
  //     // alert("invalid account details");
  //     return{
  //       statuscode: 401,
  //       status:false,
  //       message:'invalid account details'
  //     }
  //   }
  // }

  const getTransaction=(acno)=>{
    return db.user.findOne({acno})
  .then(user=>{
    if(user){
    return {
      statuscode: 200,
      status:true,
      transaction:user.transaction
      // this.userDetails[acno].transaction
    }}
    else{
      return{
        statuscode:400,
        status:false,
        message:'invalid account details'
      }
    }
  })
}

const deleteAcc=(acno)=>{
  return db.user.deleteOne({acno})//mongodb
  .then(user=>{
    if(user){
    return{
      statuscode:200,
      status:true,
      message:'Account deleted successfully'
    }
  }
  else{
    return{
      statuscode:400,
      status:false,
      message:'invalid account details'
    }
  }
 } )
}

module.exports={
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
}