import { Component, OnInit } from '@angular/core';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import {userIdToken} from '../../app/header/header.component';
import {msal, tokens} from '../../app/header/header.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,FormControl } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  ticketId: number = this.route.snapshot.params['id'];
 
  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});


  constructor( private http:HttpClient, private route: ActivatedRoute,  private router: Router,private common: CommonService) { }

  ngOnInit(): void {
   this.getviewpage();
  }
  
  view = true;
 
  getviewpage() {
    console.log(this.ticketId , "from route");
    this.view = true;
   this.getTicketById(this.ticketId);
    // return this.http.post('http://localhost:3000/EmpManager/empfilter',empfilter)
  }

  tickets:any;
 async  getTicketById (ticketId : any){
    const acc = msal.instance.getAllAccounts()[0];
    const response = await msal.instance.acquireTokenSilent({ account: acc, scopes: [] });
    console.log('repsonse ---', response);
    ticketId = parseInt(ticketId);
    let ticket = {requestid : ticketId}
    this.http.post<any>('https://10.10.20.44:3000/RequestManager/requestbyid' , ticket
    ,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }}
    ).subscribe(
      response => {
        this.tickets = response.result;
        console.log("TicketDetails", this.tickets);
        
       
  
      }
    );
  }


}

