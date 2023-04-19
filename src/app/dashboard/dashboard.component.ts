import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient, 
    private common: CommonService , private activatedRoute:ActivatedRoute , private router:Router, private msalService:MsalService ) {

  }

  searchFormGroup = this.formBuilder.group({

    changeType: [''],
    priority: [''],
    deviceType: [''],
    status: [''],


  });


  searchValue: any;
  edit: boolean = false;

  tickets: any;
  typeList: any;
  priorityList: any;
  deviceTypeList: any;
  user: any;
  empResponse: any;
  manager: any;
 
  some : any;
  UserName: any;
  reqStatusList:any;


  



  id:any;
  IsLoggedIn:boolean=false;

  ngOnInit(): void {
    
    this.id = this.activatedRoute.snapshot.params['id'];
 
  this.UserName = this.msalService.instance.getActiveAccount();
 
    
    this.getTypeDropdown();
    this.getPriorityDropdown();
    this.getDeviceTypeDropdown();
    this.getRequestDropdown();

    this.common.getEmpDetails(this.UserName.username);

    
   


if (this.id) {
 this.getTicketById(this.id);
}

else{
  this.some = setTimeout(() => {
    this.getAllRequest();
  }, 1000)
}


}




 

  getAllRequest () {
    
    this.common.getAllTickets().subscribe(
      response => {
        this.tickets = response;
        this.tickets = this.tickets.result;
        if (this.common.filtered === true) {
                  this.getFlteredRecords();
                 }
      }
    );
  }

  getRequestDropdown () {
       this.common.getRequestStatuses().then((http)=>{
      http.subscribe(
    
        response => {
          this.reqStatusList = response;
      this.reqStatusList = this.reqStatusList.result;
             }
         
      );
    })
    
     }
 

  

  getTypeDropdown () {

    this.common.getType().then((http)=>{
      http. subscribe(
        response => {
          this.typeList = response;
          this.typeList = this.typeList.result;
        }
      );
    })
   

  }


 

  getPriorityDropdown () {
    this.common.getPriority().then((http)=>{
      http. subscribe(
        response => {
          this.priorityList = response;
          this.priorityList = this.priorityList.result;
        }
      );
    })
   
  }

  

  getDeviceTypeDropdown () {
    this.common.getDeviceType().then((http)=>{
      http.subscribe(
        response => {
          this.deviceTypeList = response;
          this.deviceTypeList = this.deviceTypeList.result;
        }
      );
    })
    
  }

  enableDisbaleEdit(createdName: any, reqStatus: any , approver : any , ticketStatus : any): void {
    
     
    if ((createdName === this.common.empDetails[0].empemailid && reqStatus === "Draft") || 
    (createdName === this.common.empDetails[0].empemailid && reqStatus === "Manager Rejected")) {
      this.edit = true;
      this.common.view = false;
      
     
      

    }
    else if ((createdName === this.common.empDetails[0].empemailid )&&(reqStatus === "CAB Rejected")) {
      this.edit = true;
      this.common.view = true;
      console.log("createdName" , createdName ,this.common.empDetails[0].empemailid )
      
     
    }
    else if ((createdName === this.common.empDetails[0].empemailid && reqStatus === "CAB Approved") && ticketStatus === "open") {
      this.edit = true;
      this.common.view = true;
      console.log("draft or reject");
    }
  else if ( this.common.empDetails[0].empemailid === approver ) {
      this.edit = true;
      this.common.view = true;
      
      if (reqStatus === "New Reques") {
        this.common.manager1 = true ;
      }
    }
    else if (this.common.empDetails[0].emplevel === "CAB Manager") {
      this.edit = true;
      this.common.view = true;
      if (reqStatus === "Manager Approved") {
        this.common.cabManager= true ;
      }
    }
    else {
      this.edit = false;
    }
  }
  searchResults(): void {


    
    this.searchValue = (<HTMLInputElement>document.getElementById("SearchBar")).value;
    
  }

 

  filterRecords () {

    this.common.filtered = true ;
      this.common.filterChangeType = this.searchFormGroup.controls['changeType'].value;
      this.common.filterPriority = this.searchFormGroup.controls['priority'].value;
      this.common.filterDeviceType = this.searchFormGroup.controls['deviceType'].value;
      this.common.filterstatus = this.searchFormGroup.controls['status'].value;
  
      let filterPayLoad = {
        type: this.common.filterChangeType,
        priority: this.common.filterPriority,
        reqstatus: this.common.filterstatus  ,
        devicetype: this.common.filterDeviceType
      };

      this.common.filterTickets(filterPayLoad).then((http)=>{
        http.subscribe(
          response => {
            this.tickets = response;
            this.tickets = this.tickets.result;
           
          }
        );
      })
      

  }

 

  getFlteredRecords () {

    let filterPayLoad = {
          type: this.common.filterChangeType,
          priority: this.common.filterPriority,
          reqstatus: this.common.filterstatus  ,
          devicetype: this.common.filterDeviceType
        };

        this.common.filteredTickets(filterPayLoad).then((http)=>{
          http.subscribe(
            response => {
              this.tickets = response;
              this.tickets = this.tickets.result;
            }
          );
        })
        

  }

  clearForm(): void {

    this.searchFormGroup.controls['changeType'].setValue("");
    this.searchFormGroup.controls['priority'].setValue("");
    this.searchFormGroup.controls['deviceType'].setValue("");
    this.searchFormGroup.controls['status'].setValue("");
    
    this.common.filtered = false ;
    this.common.filterChangeType = "";
    this.common.filterPriority = "";
    this.common.filterDeviceType = "";
    this.common.filterstatus = "";
    this.getAllRequest();
  }

  sendTicketIdToService(ticketNo: any): void {

    this.common.ticketId = ticketNo;
   
  }

  viewTicket(ticketNo: any): void {
    this.common.ticketId = ticketNo;
    this.common.view = true;
  }

  setFilteredValues () {
    this.searchFormGroup.controls['changeType'].setValue(this.common.filterChangeType);
    this.searchFormGroup.controls['priority'].setValue(this.common.filterPriority);
    this.searchFormGroup.controls['deviceType'].setValue( this.common.filterDeviceType);
    this.searchFormGroup.controls['status'].setValue(this.common.filterstatus);
  }

 

  getTicketById (ticketId : any) {
    let ticket = {requestid : ticketId}

    this.common.getRequestByID(ticket).then((http)=>{
      http. subscribe(
        response => {
          this.tickets = response ;
          this.tickets = this.tickets.result;
        }
      );
    })
   

  }



}