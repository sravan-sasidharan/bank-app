import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // deposit properties
  acno="";
  pswd="";
  amount="";
  // withdraw properties
  acno1="";
  pswd1="";
  amount1="";
  // login name display
  user="";
  // date and time
  systemDate:any;

  // delete property
  acno2="";


  depositForm=this.fb.group({//group
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  withdrawForm=this.fb.group({//group
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]],//array
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1 :['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })


  constructor(private ds:DataService,private route:Router,private fb:FormBuilder) {
    if(localStorage.getItem('currentAcno')){
          
    this.user=JSON.parse(localStorage.getItem('currentUser')||'');
    }
    this.systemDate=new Date(); 
   }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login');
      this.route.navigateByUrl('');
    }
  }
deposit(){
 var acno=this.depositForm.value.acno;
 var pswd=this.depositForm.value.pswd;
 var amount=this.depositForm.value.amount;
  
 const result=this.ds.deposit(acno,pswd,amount)
    .subscribe((result:any)=>{
      alert(result.message)
    },
    result=>{
      alert(result.error.message)
    })}

withdraw(){
  
 var acno=this.withdrawForm.value.acno1;
 var pswd=this.withdrawForm.value.pswd1;
 var amount=this.withdrawForm.value.amount1;

 this.ds.withdraw(acno,pswd,amount)
 .subscribe((result:any)=>{
alert(result.message)
 },
 result=>{
  alert(result.error.message)
 
})}

//  if(this.withdrawForm.valid){
//  if(result){
//   alert(amount+":withdrawn from your account.....balance:"+result)
//  }
// }else{
//     alert('invalid input')
//     console.log(this.withdrawForm.get('acno')?.errors);
// }
  
// }

logout(){
  // remove login and username
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentAcno');
  // navigate to login
  this.route.navigateByUrl('');
}
delete(){
  this.acno2=JSON.parse(localStorage.getItem('currentAcno')||'');
}
onCancel(){
  this.acno="";
}
onDelete(event:any){
  // alert(event)
  this.ds.deleteAcc(event)
  .subscribe((result:any)=>{
    alert(result.message)
    this.route.navigateByUrl('');
    this.logout()
  },
  result=>{
    alert(result.error.message)
  }
  )
}

}

 