import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {//3rd execution
  // properties and methods
  aim="Your perfect banking partner"

  acno="";
  pswd="";
  // loginmodel
  loginForm=this.fb.group({//group
    // uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })


  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }//1st execution// dependancy injection
  // spl member function,automatically invokes when an obj created


  ngOnInit(): void {//2nd execution -life cycle hooks of angular
    // initial process of component
    
  }
  // user-defined functions //4th execution
  title = 'bankapp';
  

  accChange(event:any){
    this.acno=(event.target.value);
    

  }
  passcheck(event:any){
    this.pswd=(event.target.value);
  }

  login(){
    var accno=this.loginForm.value.acno;
    var pswdd=this.loginForm.value.pswd;


    if( this.loginForm.valid){
      const result=this.ds.login(accno,pswdd)
      .subscribe((result:any) =>{
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser))//currentuser value is set in localStorage
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('token',JSON.stringify(result.token))
        alert(result.message);
this.router.navigateByUrl('dashboard')
      },
      result=>{
        alert(result.error.message)
        this.router.navigateByUrl('')
 
      }
      )
}else{
  alert('failed to login');
  console.log(this.loginForm.get('acno')?.errors);

}
}
}