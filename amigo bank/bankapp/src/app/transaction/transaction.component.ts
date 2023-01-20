import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  // login acno hold
  acno:any;

  // transaction hold

  transaction:any;

  constructor(private ds:DataService) {
      this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
      this.transaction=this.ds.getTransaction(this.acno)
      .subscribe((result:any)=>{
        this.transaction=result.transaction
      },
      result=>{
        alert(result.error.message)
      }
      )
   }


  ngOnInit(): void {
  }

}
