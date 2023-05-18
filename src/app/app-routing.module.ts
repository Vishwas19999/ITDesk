import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { EmailComponent } from './email/email.component';

import { EmployeeComponent } from './employee/employee.component';

import { MaslGuard } from './masl.guard';
import { NewRequestComponent } from './new-request/new-request.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [

  {path:'', component:DefaultComponent },
  {path:'employee',component:EmployeeComponent,canActivate:[MaslGuard]},
  {path:'card',component:CardComponent,canActivate:[MaslGuard]},
  {path:'new_request' , component:NewRequestComponent},
  {path:'edit_request' , component:EditRequestComponent},
  {path:'something/:id' , component:DashboardComponent},
  {path:'dashboard' , component:DashboardComponent,canActivate:[MaslGuard]},
  {path:'dashboard/:id' , component:EmailComponent,canActivate:[MaslGuard]},
  {path:'notauth', component:AuthenticationComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
