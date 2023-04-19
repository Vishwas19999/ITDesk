import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import {HeaderComponent, msal, tokens} from './header/header.component'
import { node_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  
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
   empDetails : any ;
   manager1 : any ;
   cabManager : any ;
   something : boolean = false ;
   UserName:any;
   constructor(private http:HttpClient,private msalService:MsalService) { }

  getEmpDetails (username:string)  {
  
   let employee = {empemailid : username};


   console.log("employee",employee);
   
 
   
   this.http.post<any>(`${node_url}/EmpManager/empfilter` , employee
    ).subscribe(response => {
      this.empResponse = response.result;
       this.empDetails = this.empResponse;
       console.log("var",this.empResponse);
  })
}



 getEmployee(){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.get(`${node_url}/EmpManager/`,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
}

addEmployee(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/EmpManager/add`,data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
   })
}

editEmployee(edit:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/EmpManager/updateemp`,edit,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
}

deleteEmployee(empid:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/EmpManager/deleteemployeebyId`,empid,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

filterEmployee(empfilter:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/EmpManager/empfilter`,empfilter,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

addLocation(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/LocationManager/add`,data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

filterLocation(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/LocationManager/locationfilter`,data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

deleteLocation(locid:any){
return this.http.post(`${node_url}/LocationManager/deletelocationbyId`,locid)
}

editLocation(edit:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/LocationManager/updatelocation`,edit,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })

}


getAllTickets () {
  return this.http.get<any>(`${node_url}/RequestManager/allrequests`)
}

getType () {
  let listmstid = 5;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/ListDataDetail/getCodeByMasterID`,{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 
}

getPriority () {
  let listmstid = 1;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/ListDataDetail/getCodeByMasterID`,{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

getDeviceType () {
  let listmstid = 2;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/ListDataDetail/getCodeByMasterID`,{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 
}

filterTickets (filterPayLoad : any) {
   const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/RequestManager/filter`,filterPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 

}

filteredTickets (filterPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0] 
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/RequestManager/filter`,filterPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

getRequestByID (ticket : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/RequestManager/requestbyid`, ticket,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 
}

getDevices (data : any) {
  let listmstid = data ;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/ListDataDetail/getCodeByMasterID`, {listmstid},{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

getAllLocations () {
  return  this.http.get<any>(`${node_url}/LocationManager`)
}

getRequestStatuses () {
  let listmstid = 6 ;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/ListDataDetail/getCodeByMasterID`, {listmstid},{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })

}

createRequest (addDraftRequestPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/RequestManager/createrequest`, addDraftRequestPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 
}

updateRequest (updatePayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/RequestManager/updaterequest`, updatePayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })


}

mgrResponse (managerResponse : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/RequestManager/updaterequest`, managerResponse,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

CABresponse (CABresponse : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/RequestManager/updaterequest`, CABresponse,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })

}

closeTicketById (closeTicketPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post(`${node_url}/RequestManager/updaterequest`, closeTicketPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })


}

ticketSequence () {
 
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.get(`${node_url}/RequestManager/ticketid`,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

userExists (body:any) {

  return this.http.post(`${node_url}/EmpManager/userExists`,body)
  
  }

}



