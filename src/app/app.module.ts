import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeComponent } from './employee/employee.component';

import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { NgxPaginationModule } from 'ngx-pagination';

import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';

import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { EmailComponent } from './email/email.component';
import { AuthenticationComponent } from './authentication/authentication.component';




export function MSALInstanceFactory():IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'2e27ce62-b349-437c-8835-b9918948ba36',
      authority: "https://login.microsoftonline.com/a7bae7fa-0df1-4562-a554-16a95f54c8ce",
      redirectUri:'https://itapps.jktech.com/dashboard'
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeComponent,
    
    DefaultComponent,
    DashboardComponent,
    CardComponent,
    NewRequestComponent,
    EditRequestComponent,
    EmailComponent,
    AuthenticationComponent,
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    NgxPaginationModule,
    MsalModule
  ],
  providers: [ 
    {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
},MsalService,
EmailComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
