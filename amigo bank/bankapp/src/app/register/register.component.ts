import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uname="";
  pswd="";
  acno="";


  // registermodel
registerForm=this.fb.group({//group
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],//array
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
})
// control- goes to register.component.html

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { 
  }
  // fromBuilder- class its contains group,arrays and control - ReactiveFormsModule

  ngOnInit(): void {
  }
  
  register(){
    // alert("registered");
    console.log(this.registerForm);
    var uname=this.registerForm.value.uname;
    var pswd=this.registerForm.value.pswd;
    var acno=this.registerForm.value.acno;


    // var userDetails=this.ds.userDetails;
    if(this.registerForm.valid){

      const result=this.ds.register(acno,uname,pswd)
      .subscribe((result:any)=>{
        alert(result.message)
        this.router.navigateByUrl(''); 
      },
    
  result=>{
    alert(result.error.message);
    console.log(this.registerForm.get('uname')?.errors);
  }
  )

}}} 