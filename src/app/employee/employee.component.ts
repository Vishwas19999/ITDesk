import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CommonService } from '../common.service';
import { timeStamp } from 'console';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import {userIdToken} from '../../app/header/header.component';
import { IfStmt } from '@angular/compiler';

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
  p:any = 1;

levelname:any;
  typeList:any;
  emplevel:any;
//  pageSize: number = 5;
//  pageNumber:any = 1;

  // employees:any = [
  //   {EmpID:99291, EmailID:'vishwas261999@gmail.com', EmployeeName:'Vishwas.V',Level:'Consultant', Device:'Network',MgrEmpID:982882 },
  //   {EmpID:33291, EmailID:'msd@gmail.com', EmployeeName:'Dhoni',Level:'Consultant', Device:'Network',MgrEmpID:822882},
  //   {EmpID:82291, EmailID:'jah@gmail.com', EmployeeName:'Ajay',Level:'Consultant', Device:'Service',MgrEmpID:982882},
  //   {EmpID:26291, EmailID:'malli@gmail.com', EmployeeName:'Mallikarjun',Level:'Consultant', Device:'Network',MgrEmpID:182882},
  //   {EmpID:31291, EmailID:'rafi@gmail.com', EmployeeName:'Mahmad Rafi',Level:'Consultant', Device:'Network',MgrEmpID:982782},
  //   {EmpID:73245, EmailID:'ronaldo@gmail.com', EmployeeName:'Christiano',Level:'Consultant', Device:'Service',MgrEmpID:182882},
  //   {EmpID:97191, EmailID:'rahul@gmail.com', EmployeeName:'KL Rahul',Level:'Consultant', Device:'Network',MgrEmpID:982882},
  //   {EmpID:11291, EmailID:'chettri@gmail.com', EmployeeName:'Sunil',Level:'Consultant', Device:'Service',MgrEmpID:927882},
  //   {EmpID:99291, EmailID:'srikanth@gmail.com', EmployeeName:'Sriknath',Level:'Consultant', Device:'Network',MgrEmpID:172882},
  //   {EmpID:73291, EmailID:'sindhu@gmail.com', EmployeeName:'Sindhu',Level:'Consultant', Device:'Network',MgrEmpID:987282},
  //   {EmpID:99273, EmailID:'saina@gmail.com', EmployeeName:'Saina',Level:'Consultant', Device:'Network',MgrEmpID:98912},
    
  // ]

  constructor(
   
    private http:HttpClient,
    private common: CommonService,
    private fb:FormBuilder
  ){ 
    common.getEmployee().subscribe((data:any)=>{
      this.employees=data.result;
      
      console.log(this.employees);
    })
    // this.emplevel = this.employees.map((x:any) => x.emplevel);
    // console.log(this.emplevel);
    
    // this.emplevel= Array.from(new Set(this.emplevel));
 }
 
  addEmployee =  this.fb.group({
    empemailid: ['',Validators.required],
    empid: ['',Validators.required],
    empname: ['',Validators.required],
    emplevel: ['',Validators.required],
    device: ['',Validators.required],
    mgrempid: ['',Validators.required],
    mgrname: ['',Validators.required],
 })
  
// addEmployee = this.fb.group({
//   empemailid: new FormControl('',),
//   empid: new FormControl(''),
//   empname: new FormControl(''),
//   mgrempid: new FormControl(''),
//   emplevel: new FormControl(''),
//   mgrname: new FormControl(''),
//   device: new FormControl('')
//  })

  editEmployee = this.fb.group({
    empemailid: ['',Validators.required],
    empid: ['',Validators.required],
    empname: ['',Validators.required],
    mgrempid: ['',Validators.required],
    emplevel: ['',Validators.required],
    mgrname: ['',Validators.required]
   })

//  getemp(data:any){
//   this.common.getEmployee(this.pageNumber,this.pageSize).subscribe((data)=>{
//     this.employees = data;
//     this.employees = this.employees.result;
//   })
//  }

getdata(data:any){
  debugger
if(data=='Manager'){
  this.addEmployee.controls['mgrempid'].disable()
  this.addEmployee.controls['mgrname'].disable()
 }
else if(data=='CAB Manager'){
  this.addEmployee.controls['device'].disable()
  this.addEmployee.controls['mgrempid'].disable()
  this.addEmployee.controls['mgrname'].disable()
}
else{
  this.addEmployee.controls['device'].enable()
  this.addEmployee.controls['mgrempid'].enable()
  this.addEmployee.controls['mgrname'].enable()
}
}


getTypeDropdown () : void {
  let listmstid = 2 ;
  this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid},{headers:this.headers})
  .subscribe(
    response => {
      this.typeList = response.result;
      console.log("addMstResponse", this.typeList);
    }
  );
}

getemplevels () : void {
  let listmstid = 7 ;
  this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid},{headers:this.headers})
  .subscribe(
    response => {
      this.emplevel = response.result;
      console.log("addMstResponse", this.emplevel);
    }
  );
}

getidbydevice(device:any){

 this.http.post<any>('http://localhost:3000/EmpManager/getidbydevice' ,{device})
  .subscribe(
    response => {
     
      this.mid = response.result;
      console.log("mid", this.mid);
    }
  );
}


getnamebyid(empid:any){
  debugger;
  // let abc={emp}
  this.http.post<any>('http://localhost:3000/EmpManager/getnamebyid',{empid})
  .subscribe(
    response => {
      debugger;
      this.mname = response.result[0].empname;
      console.log("mname=", this.mname);
      this.addEmployee.controls['mgrname'].setValue(this.mname);
    }
  );
}


// getdev(data:any){
//   console.log(data.value);
//   this.levelname=data.value;
// if(this.levelname === "Manager"){
//   this.addEmployee.controls['mgrempid'].setValue("");
// }
// }


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
    // this.getidbydevice();
  }


  callAPI(employee:any){
    console.log(employee.value);
    this.common.addEmployee(employee.value).then((add)=>{
      add.subscribe((data)=>{
        console.log(data)
      })
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
  // reset(){
  //   this.empid = " ";
  //   this.empname = "";
  //   this.empemailid = "";
  //   this.device = "";
  //   this.mgrname ="";
  //   this.mgrempid = "";

  // }

  edit(editform:any){
    console.log(editform.value);
    
      this.common.editEmployee(editform.value).then((edit)=>{
        edit.subscribe((val)=>{
          console.log(val);
        })
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
}

 
 
  employeeid:any;
  getEmployeeid(employee:any){
    this.employeeid=employee;
    console.log(this.employeeid);
  }

  deleteemployee(){
    debugger;
   let empid={"empid":this.employeeid }
    this.common.deleteEmployee(empid).subscribe((result)=>{
      console.log("deleted successfully", result);
    })
  }

}

