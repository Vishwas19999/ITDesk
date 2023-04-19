import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CommonService } from '../common.service';
import { timeStamp } from 'console';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import {userIdToken} from '../../app/header/header.component';
import { IfStmt } from '@angular/compiler';
import { MsalService } from '@azure/msal-angular';
import { node_url } from 'src/environments/environment';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});

  searchText: any;
  employees:any;
  devices:any;

  empid:any;
  empname:any;
  empemailid:any;
  device:any;
  mgrname:any;
  mgrempid:any;

  mid:any;
  mname:any;
  mgremail:any;
  p:any = 1;

levelname:any;
  typeList:any;
  emplevel:any;
  some:any;


  constructor(
   
    private http:HttpClient,
    private common: CommonService,
    private fb:FormBuilder,
    private msalService:MsalService
  ){ 
   
      common.getEmployee().then((http)=>{
        http.subscribe((data:any)=>{
          debugger;
          this.employees=data.result;
          
          console.log(this.employees);
        })
      })
  



   
 
    
 }




 
  addEmployee =  this.fb.group({
    empemailid: ['',Validators.required],
    empid: ['',Validators.required],
    empname: ['',Validators.required],
    emplevel: ['',Validators.required],
    device: ['',Validators.required],
    mgrempid: ['',Validators.required],
    mgrname: ['',Validators.required],
    mgremailid: ['',Validators.required]
 })
  


  editEmployee = this.fb.group({
    empemailid: ['',Validators.required],
    empid: ['',Validators.required],
    empname: ['',Validators.required],
    mgrempid: ['',Validators.required],
    emplevel: ['',Validators.required],
    mgrname: ['',Validators.required],
    device: ['',Validators.required],
   })



getdata(data:any){
  debugger
if(data=='Manager'){
  this.addEmployee.controls['mgrempid'].disable()
  this.addEmployee.controls['mgrname'].disable()
  this.addEmployee.controls['mgremailid'].disable()
 }
else if(data=='CAB Manager'){
  this.addEmployee.controls['device'].disable()
  this.addEmployee.controls['mgrempid'].disable()
  this.addEmployee.controls['mgrname'].disable()
  this.addEmployee.controls['mgremailid'].disable()
}
else{
  this.addEmployee.controls['device'].enable()
  this.addEmployee.controls['mgrempid'].enable()
  this.addEmployee.controls['mgrname'].enable()
  
}
}


getTypeDropdown () : void {
  let listmstid = 2 ;
  this.http.post<any>(`${node_url}/ListDataDetail/getCodeByMasterID` , {listmstid},{headers:this.headers})
  .subscribe(
    response => {
      this.typeList = response.result;
      console.log("addMstResponse", this.typeList);
    }
  );
}

getemplevels () : void {
  let listmstid = 7 ;
  this.http.post<any>(`${node_url}/ListDataDetail/getCodeByMasterID` , {listmstid},{headers:this.headers})
  .subscribe(
    response => {
      this.emplevel = response.result;
      console.log("addMstResponse", this.emplevel);
    }
  );
}

getidbydevice(device:any){

 this.http.post<any>(`${node_url}/EmpManager/getidbydevice` ,{device})
  .subscribe(
    response => {
     
      this.mid = response.result;
      console.log("mid", this.mid);
    }
  );
}


getnamebyid(empid:any){
  debugger;

  this.http.post<any>(`${node_url}/EmpManager/getnamebyid`,{empid})
  .subscribe(
    response => {
      debugger;
      this.mname = response.result[0].empname;
      this.mgremail = response.result[0].empemailid;
      console.log(response.result[0]);
      


      console.log(this.mname,"name");
      console.log(this.mgremail,"mail");
      
      
      console.log("mname=", this.mname);
      this.addEmployee.controls['mgrname'].setValue(this.mname);
      this.addEmployee.controls['mgremailid'].setValue(this.mgremail);
    }
  );
}

getemailbyid(empid:any){
  debugger;
 
  this.http.post<any>(`${node_url}/EmpManager/getnamebyid`,{empid})
  .subscribe(
    response => {
      debugger;
      this.mname = response.result[0].empname;
      console.log(this.mname,"name");
      
      console.log("mname=", this.mname);
      this.addEmployee.controls['mgrname'].setValue(this.mname);

    }
  );
}




filterRecords = this.fb.group({
  empid: new FormControl(''),
  empname: new FormControl(''),
  empemailid: new FormControl(''),
  emplevel: new FormControl(''),
  device: new FormControl(''),
  mgrname: new FormControl(''),
  mgrempid: new FormControl('')
})

  ngOnInit(): void {
    this.getTypeDropdown ();
    this.getemplevels ();
   
  }


  callAPI(employee:any){
    console.log(employee.value);
    this.common.addEmployee(employee.value).then((add)=>{
      add.subscribe((data)=>{
        console.log(data)
        
      })
      this.some = setTimeout(() => {
        this.common.getEmployee().then((http)=>{
          http.subscribe((data:any)=>{
            this.employees=data.result;
            
            console.log(this.employees);
          })
        })
      }, 1000)
    })


  }



  
  filterdata(emp:any){
    console.log(emp.value);
    this.common.filterEmployee(emp.value).then((http)=>{
      http.subscribe((data)=>{
        this.employees = data;
        this.employees = this.employees.result;
        console.log(data)
      })
    })
  }

   clearForm() {
    this.filterRecords.reset();
  }

    clearform() {
      this.addEmployee.reset();
    }

    // clearform() {
    //   this.editEmployee.reset();
    // }
 

  edit(editform:any){
    console.log(editform.value);
    
      this.common.editEmployee(editform.value).then((edit)=>{
        edit.subscribe((val)=>{
          console.log(val);
        })
        this.some = setTimeout(() => {
          this.common.getEmployee().then((http)=>{
            http.subscribe((data:any)=>{
              this.employees=data.result;
              
              console.log(this.employees);
            })
          })
        }, 1000)
      })
  }
 

  setemp(data:any){
    debugger;
    this.editEmployee.controls['empemailid'].setValue(data.empemailid);
    this.editEmployee.controls['empid'].setValue(data.empid);
    this.editEmployee.controls['empname'].setValue(data.empname);
    this.editEmployee.controls['mgrempid'].setValue(data.mgrempid);
    this.editEmployee.controls['mgrname'].setValue(data.mgrname);
    this.editEmployee.controls['emplevel'].setValue(data.emplevel);
    this.editEmployee.controls['device'].setValue(data.device);
}

 
 
  employeeid:any;
  getEmployeeid(employee:any){
    this.employeeid=employee;
    console.log(this.employeeid);
  }

  deleteemployee(){
    debugger;
   let empid={"empid":this.employeeid }
   
    this.common.deleteEmployee(empid).then((http)=>{
      http. subscribe((result)=>{
        console.log("deleted successfully", result);
      })
      this.some = setTimeout(() => {
        this.common.getEmployee().then((http)=>{
          http.subscribe((data:any)=>{
            this.employees=data.result;
            
           
          })
        })
      }, 1000)
    })

   
  }

}

