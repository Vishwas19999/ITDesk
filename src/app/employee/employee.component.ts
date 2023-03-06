import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CommonService } from '../common.service';
import { timeStamp } from 'console';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import {userIdToken} from '../../app/header/header.component';

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

  p:any = 1;
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
 
  addEmployee = new FormGroup({
    empemailid: new FormControl(''),
    empid: new FormControl(''),
    empname: new FormControl(''),
    mgrempid: new FormControl(''),
    emplevel: new FormControl(''),
    mgrname: new FormControl(''),
    device: new FormControl('')
    // mgrname: new FormControl('')
  })
  

  editEmployee = this.fb.group({
    empemailid: new FormControl(''),
    empid: new FormControl(''),
    empname: new FormControl(''),
    mgrempid: new FormControl(''),
    emplevel: new FormControl(''),
    mgrname: new FormControl('')
   })

constructor(
    private formbuilder:FormBuilder,
    private http:HttpClient,
    private common: CommonService,
    private fb:FormBuilder
  ){ 
    common.getEmployee().subscribe((data:any)=>{
      this.employees=data.result;
      
      console.log(this.employees);
    })
 }

 

//  getemp(data:any){
//   this.common.getEmployee(this.pageNumber,this.pageSize).subscribe((data)=>{
//     this.employees = data;
//     this.employees = this.employees.result;
//   })
//  }




typeList:any;

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


filterRecords = this.fb.group({
  empid: new FormControl(''),
  empname: new FormControl(''),
  empemailid: new FormControl(''),
  // emplevel: new FormControl(''),
  device: new FormControl(''),
  mgrname: new FormControl(''),
  mgrempid: new FormControl('')
})

  ngOnInit(): void {
    this.getTypeDropdown ();
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
}

 
 
  employeeid:any;
  getEmployeeid(employee:any){
    this.employeeid=employee;
    console.log(this.employeeid);
  }

  deleteemployee(){
   let empid={"empid":this.employeeid }
    this.common.deleteEmployee(empid).subscribe((result)=>{
      console.log("deleted successfully", result);
      
    })
  }

}
