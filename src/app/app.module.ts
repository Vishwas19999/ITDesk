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


// Import the Azure AD B2C configuration 
// import { msalConfig, protectedResources } from './auth-config';

export function MSALInstanceFactory():IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'d76f4c48-fcf4-4182-ba25-6b92e5ba3e7f',
      authority: "https://login.microsoftonline.com/a7bae7fa-0df1-4562-a554-16a95f54c8ce",
      redirectUri:'http://localhost:4200/'
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
},MsalService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
