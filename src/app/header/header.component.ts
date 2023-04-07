import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { CommonService } from '../common.service';
import { AccountInfo } from '@azure/msal-browser';


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
          
         
        }
       
      }
  )
  
  this.UserName=this.msalService.instance.getActiveAccount();

  this.empDetails();
    
}

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

       
      }
    }
)
  console.log(this.msalService);
  


   
  }
  logout(){
   
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'https://10.10.20.44:4200/'
    });
  }
  empResponse:any;  
  manager:any;
 
   empDetails () {
   debugger;
   
    
    this.empResponse=this.common.empResponse;
    console.log(this.empResponse);
    
    
        
        if (this.empResponse[0].emplevel === "Manager") {
          this.manager = true;
      }
        
}
}


