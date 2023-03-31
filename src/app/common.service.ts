import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import {HeaderComponent, msal, tokens} from './header/header.component'

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
   // this.user = "vishwas26@gmail.com";
  //  console.log('common service');
    // console.log(username.username);
   
   
  //  let empemailid={ empemailid: "mahamad.rafi@jktech.com"};
//  let employee =empemailid ;
   let employee = {empemailid : username};


   console.log("employee",employee);
   
  //let employee = {empemailid : "thummana.pavani@jktech.com"};
  // empemailid:mahamad.rafi@jktech.com
   
   this.http.post<any>('http://localhost:3000/EmpManager/empfilter' , employee
    ).subscribe(response => {
      this.empResponse = response.result;
       this.empDetails = this.empResponse;
       console.log("var",this.empResponse);
  })
}

// dummy(){
//   this.UserName = this.msalService.instance.getActiveAccount();
// }

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
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/EmpManager/deleteemployeebyId',empid,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post('http://localhost:3000/EmpManager/deleteemployeebyId',empid)
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

addLocation(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/LocationManager/add',data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post('http://localhost:3000/LocationManager/add',data)
}

filterLocation(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/LocationManager/locationfilter',data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post('http://localhost:3000/LocationManager/locationfilter',data)
}

deleteLocation(locid:any){
return this.http.post('http://localhost:3000/LocationManager/deletelocationbyId',locid)
}

editLocation(edit:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/LocationManager/updatelocation',edit,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
// return this.http.post('http://localhost:3000/LocationManager/updatelocation',edit)
}


getAllTickets () {
  return this.http.get<any>('http://localhost:3000/RequestManager/allrequests')
}

getType () {
  let listmstid = 5;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/ListDataDetail/getCodeByMasterID',{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID', { listmstid })
}

getPriority () {
  let listmstid = 1;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/ListDataDetail/getCodeByMasterID',{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID', { listmstid })
}

getDeviceType () {
  let listmstid = 2;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/ListDataDetail/getCodeByMasterID',{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return  this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID', { listmstid })
}

filterTickets (filterPayLoad : any) {
   const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/RequestManager/filter',filterPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/RequestManager/filter', filterPayLoad)

}

filteredTickets (filterPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0] 
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/RequestManager/filter',filterPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/RequestManager/filter', filterPayLoad)
}

getRequestByID (ticket : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/RequestManager/requestbyid', ticket,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/RequestManager/requestbyid' , ticket)
}

getDevices (data : any) {
  let listmstid = data ;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/ListDataDetail/getCodeByMasterID', {listmstid},{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid} )
}

getAllLocations () {
  return  this.http.get<any>('http://localhost:3000/LocationManager')
}

getRequestStatuses () {
  let listmstid = 6 ;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/ListDataDetail/getCodeByMasterID', {listmstid},{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
//  return this.http.post<any>('http://localhost:3000/ListDataDetail/getCodeByMasterID' , {listmstid})
}

createRequest (addDraftRequestPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/RequestManager/createrequest', addDraftRequestPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/RequestManager/createrequest' , addDraftRequestPayLoad)
}

updateRequest (updatePayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/RequestManager/updaterequest', updatePayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
// return  this.http.post<any>('http://localhost:3000/RequestManager/updaterequest' , updatePayLoad)

}

mgrResponse (managerResponse : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/RequestManager/updaterequest', managerResponse,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/RequestManager/updaterequest' , managerResponse)
}

CABresponse (CABresponse : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/RequestManager/updaterequest', CABresponse,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  // return this.http.post<any>('http://localhost:3000/RequestManager/updaterequest' , CABresponse)
}

closeTicketById (closeTicketPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('http://localhost:3000/RequestManager/updaterequest', closeTicketPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
//  return this.http.post<any>('http://localhost:3000/RequestManager/updaterequest' , closeTicketPayLoad)

}

ticketSequence () {
  return this.http.get<any>('http://localhost:3000/RequestManager/ticketid')
}

}



