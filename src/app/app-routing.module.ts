import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';
// import { MsalGuard } from '@azure/msal-angular';
import { MaslGuard } from './masl.guard';
import { NewRequestComponent } from './new-request/new-request.component';

const routes: Routes = [
  {path:'',component:EmployeeComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'emp',component:EmployeeDetailsComponent, canActivate:[MaslGuard]},
  // {path:'new_request' , component:NewRequestComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
