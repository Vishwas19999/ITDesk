import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';

import { EmployeeComponent } from './employee/employee.component';
// import { MsalGuard } from '@azure/msal-angular';
import { MaslGuard } from './masl.guard';


const routes: Routes = [
  // {path:'',component:EmployeeComponent},
  // {path:'',redirectTo: 'DashboardComponent',pathMatch: 'full'},
  {path:'def', component:DefaultComponent },
  {path:'employee',component:EmployeeComponent, canActivate:[MaslGuard]},
 
  {path:'card',component:CardComponent}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
