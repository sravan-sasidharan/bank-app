import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// global http header object
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // login name display
  currentuser:any;

// login acno
currentAcno:any;

  userDetails:any ={
    1000:{acno:1000,username:'Allwin',password:1000,balance:10000,transaction:[]},
    1001:{acno:1001,username:'fayas',password:1001,balance:10000,transaction:[]},
    1002:{acno:1002,username:'Jishna',password:1002,balance:10000,transaction:[]},
  }

  // inject http client
  constructor(private http:HttpClient){
    //  this.getDetails();//function call
  }

// saveDetails() - To store the data in the local storage
saveDetails(){
  if(this.userDetails){
    localStorage.setItem('dataBase',JSON.stringify(this.userDetails))
  }
  
  if(this.currentAcno){
    localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
  }
  
  if(this.currentuser){
    localStorage.setItem('currentUser',JSON.stringify(this.currentuser))
  }
}

// getDetails()- To retrieve the details
// getDetails(){
//   if(localStorage.getItem('dataBase')){
//     this.userDetails = JSON.parse(localStorage.getItem('dataBase')||'');
//   }
  
//   if(localStorage.getItem('currentAcno')){
//     this.currentAcno = JSON.parse(localStorage.getItem('currentAcno')||'');
//   }
  
//   if(localStorage.getItem('currentUser')){
//     this.currentuser = JSON.parse(localStorage.getItem('currentUser')||'');
//   }
// }


  register(acno:any,username:any,password:any){
const data={
  acno,
  username,
  password, 
}
    return this.http.post('http://localhost:3000/register',data)

    // var userDetails=this.userDetails;
    // if(acno in userDetails){
    //   return false;

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
    //   this.saveDetails();//function call
    //   return true;
    // }
  }
  login(acno:any,password:any){

    const data={
      acno,
      password, 
    }
        return this.http.post('http://localhost:3000/login',data)
    

    // var userDetails=this.userDetails;
    // if(acno in userDetails){
    //   if(password==userDetails[acno].password){
    //     this.currentuser=userDetails[acno].username;
    //     this.currentAcno=acno;
    //     this.saveDetails();
    //     return true;
    //   }
    //   else{
    //     alert("incorrect password");
    //     return false;
    //   }
      
    // }
    // else{
    //   alert("invalid account number");
    //   return false;
      
    // }
   }

   getToken(){
    // fetch token from the server
    const token = JSON.parse(localStorage.getItem('token') || '');
    // generate headers

    let headers=new HttpHeaders()
    // append the token to the headers
    if(token){
      options.headers=headers.append('x-access-token', token);
      
    }
    return options
   }

  deposit(acno:any,password:any,amount:any){
    
    
const data={
  acno,
  password,
  amount
}
    return this.http.post('http://localhost:3000/deposit',data,this.getToken())
  }

  withdraw(acno:any,password:any,amount:any)
  {
     
const data={
  acno,
  password,
  amount
}
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())
  }
  getTransaction(acno:any){
    const data={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getToken())


  }
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)

}
}
