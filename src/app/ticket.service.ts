import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HeaderComponent } from './header/header.component';

@Injectable({
  providedIn: 'root' 
  // providers:[DatePipe]
})
export class TicketService {

  constructor(private http: HttpClient  ) { }

  ticketId : any ;
  view : any ;
  user : any ;
   empResponse : any ;
   manager : any ;
   filterChangeType : any
   filterPriority : any ;
   filterDeviceType : any 
   filterstatus : any ;
   filtered : any ;
   loggedIn : any ;
  getEmpDetails ()  {
   // this.user = "vishwas26@gmail.com";
    let employee = {empemailid : "rafi@gmail.com"} ;
  //let employee = {empemailid : "vishwas26@gmail.com"} ;
    debugger;
   
   return this.http.post<any>('http://localhost:3000/EmpManager/empfilter' , employee
    )
  }
}
