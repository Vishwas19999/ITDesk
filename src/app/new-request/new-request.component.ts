import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'] ,
  providers:[DatePipe]

})
export class NewRequestComponent implements OnInit{

  constructor(private http: HttpClient , private formBuilder: FormBuilder , private datepipe :DatePipe,
    private common:CommonService ) {

  }

  ngOnInit(): void {
  //  this.getEmpDetails();
   // this.getDevicesDropdown(3);
    this.getDate();
    this.getTicketNumber();
    this.getTypeDropdown();
    this.getPriorityDropdown();
    this.getDeviceTypeDropdown();
    this.getLocationDropdown();
    this.selectedDeviceType("dummy");
    this.getRequestDropdown();
  }

 
  


  
  
  
  systemtime : any ;
  ticketNumber : any ;
  ticketNumberWithPrefix : any ;
  empID : any ;
  createdBy : any ;
  createdOn : any ;
  SME_Assigned : any ;
  approverName : any ;
  type : any ;
  priority : any ;
  selectDevice : any ;
  siteName : any ;
  devices : any ;
  location : any ;
  implementTime : any ;
 // scheduledDate : any ;
 scheduleDate : any;
  RequestStatus : any ;
  businessJustification : any ;
  CMRdescre : any ;
  riskImpact : any ;
  actionPlan : any ;
  rollbackPlan : any ;
  note : any ;
  addTicketData : any ;
  backupDate : any ;
  notifyEndUser : any ;
  SME_list : any ;
  approverList : any ;
  typeList : any  ;
  priorityList: any ;
  deviceTypeList : any ;
  siteNameList : any ;
  deviceList : any ;
  locationList : any ;
 // RequestStatusList: any = [ "Manager Rejected" , "Manager Approved" , "CAB Approved"];
  postTicketResponse : any ;
  backup : any = 0;
  downTime : any = 0;
  manager : boolean = false;
  CABmanager : boolean = false;
  managerReject : boolean = false;
  CABrejected : boolean = false ;
  managerRespon : any ;
  CABrespon : any ;
  emergenc : any = false ;
  empResponse : any ;
  empDevices:any;
  reqDropdown : any ;
  verbalApproval : any ;
  email : any ;
  CreatedDate : any;
  setScheduletDate : any;
  setBackupDate : any;
  setNotifyDate : any;
  teststartDate : any ;
  SystemDate : any;
  setCreatedDate : any ;
  setVerbalDate : any;
  
  

  addTicketFormGroup = this.formBuilder.group({
    ticketNumber: [{value :'' , disabled : true }],
    empID: [{value :'' , disabled : true }],
    createdBy: [''],
    createdOn: [{value :'' , disabled : true }],
    SME_Assigned: [{value :'' , disabled : true }],
    approverName: [{value :'' , disabled : true }],
    type: ['', Validators.required],
    priority: [{value :'' , disabled: this.emergenc  }, Validators.required],
    selectDevice: ['', Validators.required],
    siteName: ['', Validators.required],
    devices: ['', Validators.required],
    location: ['', Validators.required],
    implementTime: ['', Validators.required],
    scheduledDate: ['', Validators.required],
    requestStatus: [{value :'' , disabled : true }],
    businessJustification: ['', Validators.required],
    CMRdescre: ['', Validators.required],
    riskImpact: ['', Validators.required],
    actionPlan: ['', Validators.required],
    rollbackPlan: ['', Validators.required],
    note: ['', Validators.required],
    backupDate : [''] ,
    notifyEndUser : [''],
    verbalApproval : [''] ,
    email : ['']
    
  });

  // get scheduledDate() {
  //   return this.addTicketFormGroup.get('scheduledDate');
  // }
 
 // now = new Date();
  //SystemDate : any = this.datepipe.transformconsole(this.now, 'dd/MM/YYYY');
//  SystemDate : any = this.datepipe.transform(this.now, 'MM/dd/YYYY');

  getDate () {
   
   
  //  this.SystemDate = this.datepipe.transform(now, 'd/m/yyyy, h:mm a');
  //  console.log("date" , this.SystemDate);
    //this.systemtime = this.datepipe.transform(now, 'h:mm a');
  //  console.log("date" , this.SystemDate);
   // console.log("time" , this.systemtime);
   this.SystemDate = new Date().toISOString().slice(0, 10)
   console.log("this.SystemDate" ,this.SystemDate); // in ui (mm/dd/yyyy) in console (yyyy-mm-dd)
   // this.addTicketFormGroup.controls['createdOn'].setValue(this.SystemDate);


    
  }

  

  // getEmpDetails () : void {
  //   this.SME_Assigned = "vishwas26@gmail.com";
  //   let employee = {empemailid : this.SME_Assigned} ;
    
  //   this.http.post<any>('http://localhost:3000/EmpManager/empfilter' , employee
  //   ).subscribe(
  //     response => {
  //       this.empResponse = response.result;
  //       console.log("empRespom", this.empResponse);
  //       this.empDevices = this.empResponse[0].device ;
        
        
  //       this.getDate();

       
  //     }
  //   );
  // }

  // getEmployeeDetails() {
  //   this.common.getEmpDetails().subscribe(
  //     response => {
  //       this.empResponse = response.result;
  //       console.log("empRespom", this.empResponse);

  //    if (this.empResponse[0].emplevel === "Manager") {
  //     this.manager = true;
      
  //  }
  //     }
  //   );
  // }







  // getTypeDropdown () : void {
  //   let listmstid = 5 ;
  //   this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
  //   ).subscribe(
  //     response => {
  //       this.typeList = response.result;
        
     
  //     }
  //   );
  // }

  getTicketNumber () {

    this.common.ticketSequence().subscribe(
      response => {
        this.ticketNumber = response.result;
        this.setInitialValues() ;
        
      }
    );

  }

  setInitialValues () {

    this.setCreatedDate = this.SystemDate;
    
   // this.addTicketFormGroup.controls.implementTime.setValue(this.systemtime);
  // this.ticketNumberWithPrefix = "CMR-" + this.ticketNumber;
    this.addTicketFormGroup.controls['ticketNumber'].setValue("CMR-" + this.ticketNumber);
    this.addTicketFormGroup.controls['empID'].setValue(this.common.empDetails[0].empid);
    this.addTicketFormGroup.controls['SME_Assigned'].setValue(this.common.empDetails[0].empemailid);
    this.addTicketFormGroup.controls['createdBy'].setValue(this.common.empDetails[0].empemailid);
    this.addTicketFormGroup.controls['approverName'].setValue(this.common.empDetails[0].mgremailid);
    this.addTicketFormGroup.controls['type'].setValue("Normal");
    this.addTicketFormGroup.controls['priority'].setValue("Low");
   // 
   // this.addTicketFormGroup.controls['scheduledDate'].setValue(this.SystemDate);
   this.setScheduletDate = this.SystemDate;
    this.addTicketFormGroup.controls['selectDevice'].setValue(this.common.empDetails[0].device);
    this.addTicketFormGroup.controls['requestStatus'].setValue("New Request");

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
    // subscribe(
    //   response => {
    //     this.typeList = response.result;
        
    //   }
    // );

  }

  // getPriorityDropdown () : void {
  //   let listmstid = 1 ;
  //   this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
  //   ).subscribe(
  //     response => {
        
      
  //         this.priorityList = response.result;
        
       
  //     }
  //   );
  // }

  getPriorityDropdown () {
    this.common.getPriority().then((http)=>{
        http.subscribe(
          response => {
            this.priorityList = response;
            this.priorityList = this.priorityList.result;
          }
        );
    })
    // subscribe(
    //   response => {
    //     this.priorityList = response;
    //     this.priorityList = this.priorityList.result;
    //   }
    // );
  }

  // getDeviceTypeDropdown () : void {
    
  //   let listmstid = 2 ;
  //   this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
  //   ).subscribe(
  //     response => {
  //       this.deviceTypeList = response.result;
      
       
  //     }
  //   );
  // }


  getDeviceTypeDropdown () {
    this.common.getDeviceType().then((http)=>{
      http. subscribe(
        response => {
          this.deviceTypeList = response;
          this.deviceTypeList = this.deviceTypeList.result;
        }
      );
    })
    // subscribe(
    //   response => {
    //     this.deviceTypeList = response;
    //     this.deviceTypeList = this.deviceTypeList.result;
    //   }
    // );
  }

  // getSiteNameDropdown () : void {
  //   let listmstid = 5 ;
  //   this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
  //   ).subscribe(
  //     response => {
  //       this.siteNameList = response.result;
       
  //     }
  //   );
  // }

  // getDevicesDropdown (data : any) : void {
  //   let listmstid = data ;
    
  //   this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
  //   ).subscribe(
  //     response => {
  //       this.deviceList = response.result;
       
  //     }
  //   );
  // }

  getDevicesDropdown (data : any) {
    this.common.getDevices(data).then((http)=>{
      http. subscribe(
        response => {
          this.deviceList = response;
          this.deviceList = this.deviceList.result;
        }
      );
    })
    // subscribe(
    //   response => {
    //     this.deviceList = response.result;
    //   }
    // );
  }


  // getLocationDropdown() : void {
    
  //   this.http.get<any>('http://localhost:3000/LocationManager'
  //   ).subscribe(
  //     response => {
  //       this.locationList = response.result;
  //       this.siteNameList = this.locationList;
       
  //     }
  //   );
  // }

  getLocationDropdown() {
    this.common.getAllLocations().subscribe(
      response => {
        this.locationList = response.result;
        this.siteNameList = this.locationList;
      }
    );
  }

  

  // getRequestDropdown () : void {
    
  //   let listmstid = 6 ;
  //   this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
  //   ).subscribe(
  //     response => {
  //       this.reqDropdown = response.result;
      
        
     
  //     }
  //   );
  // }

  getRequestDropdown () {

    this.common.getRequestStatuses().then((http)=>{
      http.subscribe(
        response => {
          this.reqDropdown = response;
          this.reqDropdown = this.reqDropdown.result;
          
        }
      );
    })
    // subscribe(
    //   response => {
    //     this.reqDropdown = response.result;
        
    //   }
    // );

  }

  transFormDate (date:any) {
    
    let givenDate = date.split('-')
  
    let TransformedDate = givenDate[0] + "/" + givenDate[1] + "/" + givenDate[2];
    return TransformedDate;
  }

  makePostTicketPayLoad ( ) : void {
    

    //this.ticketNumber = this.addTicketFormGroup.controls['ticketNumber'].value;
    this.empID = this.addTicketFormGroup.controls['empID'].value;
    this.createdBy = this.addTicketFormGroup.controls['createdBy'].value;
    //this.createdOn = this.addTicketFormGroup.controls['createdOn'].value?.split('/');
    //this.CreatedDate = this.createdOn[0] + "/" + this.createdOn[1] + "/" + this.createdOn[2];
    this.CreatedDate = this.addTicketFormGroup.controls['createdOn'].value
    
    this.SME_Assigned = this.addTicketFormGroup.controls['SME_Assigned'].value;
    this.approverName = this.addTicketFormGroup.controls['approverName'].value;
    this.type = this.addTicketFormGroup.controls['type'].value;
    this.priority = this.addTicketFormGroup.controls['priority'].value;
    this.selectDevice = this.addTicketFormGroup.controls['selectDevice'].value;
    this.siteName = this.addTicketFormGroup.controls['siteName'].value;
    this.devices = this.addTicketFormGroup.controls['devices'].value;
    this.location = this.addTicketFormGroup.controls['location'].value;
    this.implementTime = this.addTicketFormGroup.controls['implementTime'].value;
    this.scheduleDate = this.addTicketFormGroup.controls['scheduledDate'].value ;
    console.log("this.scheduleDate" , this.scheduleDate); // without transform in console and sending to backend (yyyy-mm-dd)
  // this.scheduledDate = "03/30/2023";
    this.businessJustification = this.addTicketFormGroup.controls['businessJustification'].value;
    this.CMRdescre = this.addTicketFormGroup.controls['CMRdescre'].value;
    this.riskImpact = this.addTicketFormGroup.controls['riskImpact'].value;
    this.actionPlan = this.addTicketFormGroup.controls['actionPlan'].value;
    this.rollbackPlan = this.addTicketFormGroup.controls['rollbackPlan'].value;
    this.note = this.addTicketFormGroup.controls['note'].value;
    this.backupDate = this.addTicketFormGroup.controls['backupDate'].value;
 // this.backupDate = "03/30/2023";
 
    this.notifyEndUser = this.addTicketFormGroup.controls['notifyEndUser'].value;
    
    this.verbalApproval = this.addTicketFormGroup.controls['verbalApproval'].value;
    this.email = this.addTicketFormGroup.controls['email'].value;
  
    // this.addTicketData = {ticketNumber:this.ticketNumber , empid:this.empID , createdby:this.createdBy ,
    //   createddate:this.CreatedDate ,smeemailid:this.SME_Assigned , approveremail:this.approverName ,
    //   type:this.type,priority:this.priority,devicetype:this.selectDevice,sitename:this.siteName,
    //   device:this.devices,location:this.location,implemettime:this.implementTime,
    //   scheduleddate:this.scheduledDate,reqstatus:this.RequestStatus,justification:this.businessJustification,
    //   cmrdesc:this.CMRdescre,risk:this.riskImpact,actionplan:this.actionPlan,rollbackplan:this.rollbackPlan,
    //   relincident:this.note,backup:this.backup,backupdate:this.backupDate,downtime:this.downTime,downtimenotifydate:this.notifyEndUser}
       //let checkbox = document.getElementById("flexSwitchCheckDefault");
       
  }

  // sendDraftRequest () : void {
    

  //   this.makePostTicketPayLoad();

  //   this.RequestStatus = "Draft";

  //   this.addTicketData = {ticketNumber:this.ticketNumber , empid:this.empID , createdby:this.createdBy ,
  //     createddate:this.CreatedDate ,smeemailid:this.SME_Assigned , approveremail:this.approverName ,
  //     type:this.type,priority:this.priority,devicetype:this.selectDevice,sitename:this.siteName,
  //     device:this.devices,location:this.location,implemettime:this.implementTime,
  //     scheduleddate:this.scheduleDate,reqstatus:this.RequestStatus,justification:this.businessJustification,
  //     cmrdesc:this.CMRdescre,risk:this.riskImpact,actionplan:this.actionPlan,rollbackplan:this.rollbackPlan,
  //     relincident:this.note,backup:this.backup,backupdate:this.backupDate,downtime:this.downTime,downtimenotifydate:this.notifyEndUser}
  //     console.log("this.adddraftTicketData" , this.addTicketData);

  //     this.http.post<any>('http://localhost:3000/RequestManager/createrequest' , this.addTicketData
  //   ).subscribe(
  //     response => {
  //       this.postTicketResponse = response;
        
        
  //     }
  //   );
  // }

  sendDraftRequest () {

  this.makePostTicketPayLoad();

    this.RequestStatus = "Draft";

    this.addTicketData = {ticketNumber:this.ticketNumber , empid:this.empID , createdby:this.createdBy ,
      createddate:this.CreatedDate ,smeemailid:this.SME_Assigned , approveremail:this.approverName ,
      type:this.type,priority:this.priority,devicetype:this.selectDevice,sitename:this.siteName,
      device:this.devices,location:this.location,implemettime:this.implementTime,
      scheduleddate:this.scheduleDate,reqstatus:this.RequestStatus,justification:this.businessJustification,
      cmrdesc:this.CMRdescre,risk:this.riskImpact,actionplan:this.actionPlan,rollbackplan:this.rollbackPlan,
      relincident:this.note,backup:this.backup,backupdate:this.backupDate,downtime:this.downTime,downtimenotifydate:this.notifyEndUser ,
      verbalapprovaldate : this.verbalApproval , isemailattached : this.email}
      console.log("this.adddraftTicketData" , this.addTicketData);

      this.common.createRequest(this.addTicketData).then((http)=>{
        http.subscribe(
          response => {
            this.postTicketResponse = response;
            
          }
        );
      })
      // subscribe(
      //   response => {
      //     this.postTicketResponse = response;
          
      //   }
      // );

  }


  // sendNewRequest () : void {
    

  //   this.makePostTicketPayLoad();

  //   this.RequestStatus = "New Request" ;

  //   this.addTicketData = {ticketNumber:this.ticketNumber , empid:this.empID , createdby:this.createdBy ,
  //     createddate:this.CreatedDate ,smeemailid:this.SME_Assigned , approveremail:this.approverName ,
  //     type:this.type,priority:this.priority,devicetype:this.selectDevice,sitename:this.siteName,
  //     device:this.devices,location:this.location,implemettime:this.implementTime,
  //     scheduleddate:this.scheduleDate,reqstatus:this.RequestStatus,justification:this.businessJustification,
  //     cmrdesc:this.CMRdescre,risk:this.riskImpact,actionplan:this.actionPlan,rollbackplan:this.rollbackPlan,
  //     relincident:this.note,backup:this.backup,backupdate:this.backupDate,downtime:this.downTime,downtimenotifydate:this.notifyEndUser}
  //     console.log("sendnewRequestPayload" ,this.addTicketData );
  //   this.http.post<any>('http://localhost:3000/RequestManager/createrequest' , this.addTicketData
  //   ).subscribe(
  //     response => {
  //       this.postTicketResponse = response;
        
        
  //     }
  //   );
       

  // }


  sendNewRequest () {

    this.makePostTicketPayLoad();

    this.RequestStatus = "New Request" ;

    this.addTicketData = {ticketNumber:this.ticketNumber , empid:this.empID , createdby:this.createdBy ,
      createddate:this.CreatedDate ,smeemailid:this.SME_Assigned , approveremail:this.approverName ,
      type:this.type,priority:this.priority,devicetype:this.selectDevice,sitename:this.siteName,
      device:this.devices,location:this.location,implemettime:this.implementTime,
      scheduleddate:this.scheduleDate,reqstatus:this.RequestStatus,justification:this.businessJustification,
      cmrdesc:this.CMRdescre,risk:this.riskImpact,actionplan:this.actionPlan,rollbackplan:this.rollbackPlan,
      relincident:this.note,backup:this.backup,backupdate:this.backupDate,downtime:this.downTime,downtimenotifydate:this.notifyEndUser ,
      verbalapprovaldate : this.verbalApproval , isemailattached : this.email}

      this.common.createRequest(this.addTicketData).then((http)=>{
        http. subscribe(
          response => {
            this.postTicketResponse = response;
            
          }
        );
      })
      // subscribe(
      //   response => {
      //     this.postTicketResponse = response;
          
      //   }
      // );
  }

  getCheckboxResponse1() : void {
    let element = <HTMLInputElement> document.getElementById("flexSwitchCheckDefault"); 
    if (element.checked)
     { 
      this.backupDate = true;
      this.backup = 1 ;
     // this.addTicketFormGroup.controls['backupDate'].setValue(this.SystemDate);
    this.setBackupDate = this.SystemDate;
    // this.addTicketFormGroup.controls['backupDate'].setValidators([Validators.required]);
     
    }
    else {
      this.backupDate = false;
      this.backup = 0 ;
     // this.addTicketFormGroup.controls['backupDate'].setValue("");
     this.setBackupDate = "";
    }
  }

  getCheckboxResponse2() : void {
    let element = <HTMLInputElement> document.getElementById("flexSwitchCheckDefault1"); 
    if (element.checked)
     { 
      this.notifyEndUser = true;
      this.downTime = 1;
     // this.addTicketFormGroup.controls['notifyEndUser'].setValue(this.SystemDate);
     this.setNotifyDate = this.SystemDate;
     
    }
    else {
      this.notifyEndUser = false;
      this.downTime = 0;
     // this.addTicketFormGroup.controls['notifyEndUser'].setValue("");
     this.setNotifyDate = "";
    // this.addTicketFormGroup.controls['backupDate'].setValidators([Validators.required])
    }
  }
   
  typeResponse (response : any) : void {
  
    if (response === "Emergency") {
      this.addTicketFormGroup.controls['priority'].setValue("Critical");
      this.addTicketFormGroup.controls['priority'].disable();
      this.emergenc = true ;
      this.setVerbalDate = this.SystemDate;
    
    this.addTicketFormGroup.controls['email'].setValidators([Validators.required]);
    this.addTicketFormGroup.controls['email'].setValue("");
    this.addTicketFormGroup.controls['email'].updateValueAndValidity();
      
    }
    else {
      this.emergenc = false ;
      this.addTicketFormGroup.controls['priority'].setValue("Low");
      //this.priorityList = [{listdtlcode : "High" }, {listdtlcode : "Medium" },{listdtlcode : "Low" }]
      this.addTicketFormGroup.controls['priority'].enable();
      this.setVerbalDate = "";
    this.addTicketFormGroup.controls['email'].setValidators([]);
    this.addTicketFormGroup.controls['email'].updateValueAndValidity();
    }

  }


  // managerResponse (value:any) : void {
  //   this.managerRespon = value
  //   if (value === "Approve"){
  //     this.managerReject = false;
  //   }
  //   else {
  //     this.managerReject = true;
  //   }
    
  // }

 

  // CABresponse(value:any) : void {
  //   this.CABrespon = value
  //   if (value === "Approve"){
  //     this.CABrejected = false;
  //   }
  //   else {
  //     this.CABrejected = true;
  //   }
  // }

  selectedDeviceType(value : any) : void{
    
    if (value === "Network" || this.empDevices === "Network") {
      this.getDevicesDropdown(3);
      this.empDevices = "";
    }
    else {
      this.getDevicesDropdown(4);
    }
  }


}