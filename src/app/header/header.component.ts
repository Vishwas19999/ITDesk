import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
// import {getToken} from '../../app/fetch';

  export let msal:MsalService;
  export let userIdToken:any
  export let tokens:any
  @Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  
constructor(private msalService:MsalService) {
    msal = this.msalService;
   }
  

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      async res=>{
        if(res != null && res.account != null){
          this.msalService.instance.setActiveAccount(res.account)
          // userIdToken = await getToken(['User.Read'])
        }
      }
  )}
  // toggleSidebar(){
  //   this.opened = !this.opened;
  // }
  getTokenReponses():any{
    const acc = msal.instance.getAllAccounts()[0]
  msal.instance.acquireTokenPopup({account:acc,scopes:[]}).then((response)=>{
    console.log('########',response)
    tokens = response
  }
).catch((err)=>{
  tokens ={};
  })
}

  isLoggedIn():boolean{
    return this.msalService.instance.getActiveAccount()!=null 
  }

  login(){
  this.msalService.loginRedirect()


    // this.msalService.instance.loginPopup().then((response:any)=>{
    //   console.log('---------------------',response)
    //   this.msalService.instance.setActiveAccount(response.account)
    //   const account = this.msalService.instance.getAllAccounts()[0]
    //   // this.msalService.instance.acquireTokenRedirect({account:account,scopes: ["User.read"]}).then((response)=>[
    //   //   console.log("@@@@@@@",response)
    //   // ])
    // })
    // subscribe((response:any)=>{
    // })
  }
  logout(){
    // debugger
    // console.log('inside logout')
    // this.msalService.logout();
    // console.log('inside logout2')
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/'
    });
  }
    


  
}
// function getToken(arg0: string[]): any {
//   throw new Error('Function not implemented.');
// }

