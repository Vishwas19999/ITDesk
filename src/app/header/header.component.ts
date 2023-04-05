import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { CommonService } from '../common.service';
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
  
  showMe:boolean=true;

profile:any="";
UserName:any;


  // toggleTag(){
  //   this.showMe = !this.showMe;
  // }

constructor(private msalService:MsalService, private common:CommonService) {
    msal = this.msalService;
   }
  

  ngOnInit(): void {
    
    this.msalService.instance.handleRedirectPromise().then(
      async res=>{
        if(res != null && res.account != null){
          
          this.msalService.instance.setActiveAccount(res.account)
          console.log(res.account.username);
          console.log(res.account.name);
          
          // userIdToken = await getToken(['User.Read'])
        }
       
      }
  )
  
  this.UserName=this.msalService.instance.getActiveAccount();
  // console.log(this.UserName.username);
  
  // console.log( this.UserName.username,"v");
  this.empDetails();
    
}
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
    this.profile=this.msalService.instance.getActiveAccount()
    return this.msalService.instance.getActiveAccount()!=null 
    
}

  login(){
  this.msalService.loginRedirect()
  
  this.msalService.instance.handleRedirectPromise().then(
    async res=>{
      if(res != null && res.account != null){
        this.msalService.instance.setActiveAccount(res.account)

        // console.log(res.account.username);
        // console.log(res.account.name);
        
        // userIdToken = await getToken(['User.Read'])
      }
    }
)
  console.log(this.msalService);
  


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
      postLogoutRedirectUri: 'https://10.10.20.44:4200/'
    });
  }
  empResponse:any;  
  manager:any;
 
   empDetails () {
   debugger;
    // this.UserName = this.msalService.instance.getActiveAccount();
    
    this.empResponse=this.common.empResponse;
    console.log(this.empResponse);
    
      //  this.common.getEmpDetails(this.UserName.username)
      //  .subscribe(response => {
      //  this.empResponse = response.result;
      //   this.common.empDetails = this.empResponse;
      //   console.log("var",this.empResponse);
        
        if (this.empResponse[0].emplevel === "Manager") {
          this.manager = true;
      }
        
}
}


