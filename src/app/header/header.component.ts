import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { CommonService } from '../common.service';
import { AccountInfo } from '@azure/msal-browser';
import { NavigationStart,Router, ActivatedRoute } from '@angular/router';
import { EmailComponent } from '../email/email.component';


  export let msal:MsalService;
  export let userIdToken:any
  export let tokens:any
  @Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  showMe:boolean=false;

profile:any="";
UserName:any;
showHead: boolean = false;


 
constructor(private msalService:MsalService, private common:CommonService,private router: Router, private emailComponent: EmailComponent,private activatedRoute:ActivatedRoute) {

  router.events.forEach((event) => {

    if (event instanceof NavigationStart) {
    
   
    debugger
    if (event['url'] == '/' || event['url'] == '/notauth') {
    
    
    
    this.showHead = false;
    
    } 
    else {
    
    this.showHead = true;
    
    }
    
    }
    
    });
    msal = this.msalService;
   }
  
id:any;


  ngOnInit(): void {
   
   

    this.msalService.instance.handleRedirectPromise().then(
      async res=>{
        if(res != null && res.account != null){
         
        
          this.msalService.instance.setActiveAccount(res.account)
          debugger
          // console.log(res.account.username);
          // console.log(res.account.name);
           if(res.account.username){
          
          let body={"email":res.account.username}
          this.common.userExists(body).subscribe((res:any)=>{
           
          
         
           if(res.result.length!=0){
            this.router.navigate(['/dashboard'])
           }
           else{
            this.router.navigate(['/notauth'])
           }
        
          
          })
         }
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
    return this.msalService.instance.getActiveAccount()!=null;
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
}


  logout(){
   
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'https://itapps.jktech.com'
    });
  }
  empResponse:any;  
  manager:any;
 
   empDetails () {
   
    this.empResponse=this.common.empResponse;
    
    if (this.empResponse[0].emplevel === "Manager") {
          this.manager = true;
      }
        
}
}


