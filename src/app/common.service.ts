import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {msal, tokens} from './header/header.component'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

getEmployee(){
  // const acc = msal.instance.getAllAccounts()[0]
  // return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
  //   console.log('repsonse ---',response)
  //   return this.http.post('httP://localhost:3000/EmpManager/add',{headers:{
  //     'Authorization':`Bearer ${response.idToken}`
  //   }})
  // })
  return this.http.get('http://localhost:3000/EmpManager/')
}


addEmployee(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('httP://localhost:3000/EmpManager/add',data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
}

editEmployee(edit:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/EmpManager/updateemp',edit,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

deleteEmployee(empid:any){
  return this.http.post('http://localhost:3000/EmpManager/deleteemployeebyId ',empid)
}

filterEmployee(empfilter:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/EmpManager/empfilter',empfilter,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post('http://localhost:3000/EmpManager/empfilter',empfilter)
}

}
