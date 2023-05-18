import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MaslGuard implements CanActivate {
  constructor(private msalService:MsalService, private cs:CommonService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.msalService.instance.getActiveAccount()==null){
      return false;
    }
    else{

      let body={
     
     "email":this.msalService.instance.getActiveAccount().username
     
    }
     
    return new Promise(res => {
     
      this.cs.userExists(body).subscribe(
     
      (active:any ) => {
     
   if (active.result.length!=0) {
     
     res(true);
     
     } else {
     
   this.router.navigate(['/notauth']);
  // this.router.navigate(['/notauth'], { queryParams: { returnUrl: state.url }});
      res(false);
     
    }
     
      },
     
    (error) => {
     
     this.router.navigate(['/notauth']);
     
     res(false);
     
  }
     
    );
     
   });
 }
  }
}