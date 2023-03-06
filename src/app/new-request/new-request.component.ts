import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'] ,
  providers:[DatePipe]

})
export class NewRequestComponent implements OnInit{

  constructor(private http: HttpClient , private formBuilder: FormBuilder , private datepipe :DatePipe ) {

  }

  ngOnInit(): void {
   
    this.getDate();
    this.getTypeDropdown();
    this.getPriorityDropdown();
    this.getDeviceTypeDropdown();
    this.getDevicesDropdown();
  }
  


  addTicketFormGroup = this.formBuilder.group({
    ticketNumber: [{value :'' , disabled : true }],
    empID: [{value :'' , disabled : true }],
    createdBy: [''],
    createdOn: [{value :''  }],
    SME_Assigned: [{value :'' , disabled : true }],
    approverName: [{value :'' , disabled : true }],
    type: ['', Validators.required],
    priority: ['', Validators.required],
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
    notifyEndUser : ['']
    
  });
  
  
  systemtime : any ;
  ticketNumber : any ;
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
  scheduledDate : any ;
  RequestStatus : any = "new request";
  businessJustification : any ;
  CMRdescre : any ;
  riskImpact : any ;
  actionPlan : any ;
  rollbackPlan : any ;
  note : any ;
  addTicketData : any ;
  backupDate : any ;
  notifyEndUser : any ;
  SME_list : any = ["amit.k@Jktech.com" ,"sudhir.k@Jktech.com" , "dinesh.kumar@Jktech.com" , "sajan.purayil@Jktech.com" ];
  approverList : any = ["ravi.kumar@Jktech.com" , "abhin.kr@Jktech.com" , "sajan.purayil@Jktech.com"];
  typeList : any  ;
  priorityList: any ;
  deviceTypeList : any ;
  siteNameList : any = ["bangalore" , "Hyderabad" , "Noida" , "All locations" , "Others"] ;
  deviceList : any ;
  locationList : any = ["bangalore" , "Hyderabad" , "Noida" , "All locations" , "Others"];
  RequestStatusList: any = [ "Manager Rejected" , "Manager Approved" , "CAB Approved"];
  postTicketResponse : any ;
  backup : any = 0;
  downTime : any = 0;

 
  now = new Date();
  //SystemDate : any = this.datepipe.transform(this.now, 'dd/MM/YYYY');
  SystemDate : any = this.datepipe.transform(this.now, 'MM/dd/YYYY');

  getDate () {
   
   
  //  this.SystemDate = this.datepipe.transform(now, 'd/m/yyyy, h:mm a');
  //  console.log("date" , this.SystemDate);
    //this.systemtime = this.datepipe.transform(now, 'h:mm a');
    console.log("date" , this.SystemDate);
   // console.log("time" , this.systemtime);
    // this.addTicketFormGroup.controls.createdOn.setValue(this.SystemDate);
   // this.addTicketFormGroup.controls.implementTime.setValue(this.systemtime);
    // this.addTicketFormGroup.controls.ticketNumber.setValue("CR-23456");
    // this.addTicketFormGroup.controls.empID.setValue("2777");
    this.addTicketFormGroup.controls['SME_Assigned'].setValue("sudhir.k@Jktech.com");
    this.addTicketFormGroup.controls['createdBy'].setValue("sudhir.k@Jktech.com");
    this.addTicketFormGroup.controls['approverName'].setValue("naveen.poovaiah@jktech.com");
    this.addTicketFormGroup.controls['priority'].setValue("Medium");
    
  }

  getTypeDropdown () : void {
    let listmstid = 5 ;
    this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
    ).subscribe(
      response => {
        this.typeList = response.result;
        console.log("addMstResponse", this.typeList);
       
        
     
      }
    );
  }

  getPriorityDropdown () : void {
    let listmstid = 1 ;
    this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
    ).subscribe(
      response => {
        this.priorityList = response.result;
        console.log("addMstResponse", this.typeList);
       
      }
    );
  }

  getDeviceTypeDropdown () : void {
    let listmstid = 2 ;
    this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
    ).subscribe(
      response => {
        this.deviceTypeList = response.result;
        console.log("addMstResponse", this.typeList);
       
      }
    );
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

  getDevicesDropdown () : void {
    let listmstid = 3 ;
    this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid}
    ).subscribe(
      response => {
        this.deviceList = response.result;
       
      }
    );
  }

  makePostTicketPayLoad ( ) : void {
    debugger;

    this.ticketNumber = this.addTicketFormGroup.controls['ticketNumber'].value;
    this.empID = this.addTicketFormGroup.controls['empID'].value;
    this.createdBy = this.addTicketFormGroup.controls['createdBy'].value;
    this.createdOn = this.addTicketFormGroup.controls['createdOn'].value;
    this.SME_Assigned = this.addTicketFormGroup.controls['SME_Assigned'].value;
    this.approverName = this.addTicketFormGroup.controls['approverName'].value;
    this.type = this.addTicketFormGroup.controls['type'].value;
    this.priority = this.addTicketFormGroup.controls['priority'].value;
    this.selectDevice = this.addTicketFormGroup.controls['selectDevice'].value;
    this.siteName = this.addTicketFormGroup.controls['siteName'].value;
    this.devices = this.addTicketFormGroup.controls['devices'].value;
    this.location = this.addTicketFormGroup.controls['location'].value;
    this.implementTime = this.addTicketFormGroup.controls['implementTime'].value;
    this.scheduledDate = this.addTicketFormGroup.controls['scheduledDate'].value;
    this.businessJustification = this.addTicketFormGroup.controls['businessJustification'].value;
    this.CMRdescre = this.addTicketFormGroup.controls['CMRdescre'].value;
    this.riskImpact = this.addTicketFormGroup.controls['riskImpact'].value;
    this.actionPlan = this.addTicketFormGroup.controls['actionPlan'].value;
    this.rollbackPlan = this.addTicketFormGroup.controls['rollbackPlan'].value;
    this.note = this.addTicketFormGroup.controls['note'].value;
    this.backupDate = this.addTicketFormGroup.controls['backupDate'].value;
    this.notifyEndUser = this.addTicketFormGroup.controls['notifyEndUser'].value;
  
    this.addTicketData = {ticketNumber:this.ticketNumber , empid:6604 , createdby:this.createdBy ,
      createddate:this.createdOn ,smeemailid:this.SME_Assigned , approveremail:this.approverName ,
      type:this.type,priority:this.priority,devicetype:this.selectDevice,sitename:this.siteName,
      device:this.devices,location:this.location,implemettime:this.implementTime,
      scheduleddate:this.scheduledDate,reqstatus:this.RequestStatus,justification:this.businessJustification,
      cmrdesc:this.CMRdescre,risk:this.riskImpact,actionplan:this.actionPlan,rollbackplan:this.rollbackPlan,
      relincident:this.note,backup:this.backup,backupdate:this.backupDate,downtime:this.downTime,downtimenotifydate:this.notifyEndUser}

       console.log(this.addTicketData);
       //let checkbox = document.getElementById("flexSwitchCheckDefault");
       this.sendDataToPostTicketAPI(this.addTicketData);
       debugger;


  }



  sendDataToPostTicketAPI (addTicketData:any) : void {
    debugger;

    this.http.post<any>('http://localhost:3000/RequestManager/createrequest' , addTicketData)
    .subscribe(
      response => {
        this.postTicketResponse = response.result;
        console.log("postTicketResponse", this.postTicketResponse);
        debugger;
      }
    );
       debugger;

  }

  getCheckboxResponse1() : void {
    let element = <HTMLInputElement> document.getElementById("flexSwitchCheckDefault"); 
    if (element.checked)
     { 
      this.backupDate = true;
      this.backup = 1 ;
    }
    else {
      this.backupDate = false;
      this.backup = 0 ;
    }
  }

  getCheckboxResponse2() : void {
    let element = <HTMLInputElement> document.getElementById("flexSwitchCheckDefault1"); 
    if (element.checked)
     { 
      this.notifyEndUser = true;
      this.downTime = 1;
    }
    else {
      this.notifyEndUser = false;
      this.downTime = 0;
    }
  }

}
