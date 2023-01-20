import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {//login - 4200
    path:'',component:LoginComponent
  },
  {//dashboard - 4200/dashboard
    path:'dashboard',component:DashboardComponent
  },
  {//register -4200/register
    path:'register',component:RegisterComponent

  },
  {//transaction -4200/transaction
    path:'transaction',component:TransactionComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
