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
  
   let employee = {empemailid : username};


   console.log("employee",employee);
   
 
   
   this.http.post<any>('https://10.10.20.44:3000/EmpManager/empfilter' , employee
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
    return this.http.get('https://10.10.20.44:3000/EmpManager/',{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
}

addEmployee(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/EmpManager/add',data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
   })
}

editEmployee(edit:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/EmpManager/updateemp',edit,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
}

deleteEmployee(empid:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/EmpManager/deleteemployeebyId',empid,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

filterEmployee(empfilter:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/EmpManager/empfilter',empfilter,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

addLocation(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/LocationManager/add',data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

filterLocation(data:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/LocationManager/locationfilter',data,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

deleteLocation(locid:any){
return this.http.post('https://10.10.20.44:3000/LocationManager/deletelocationbyId',locid)
}

editLocation(edit:any){
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/LocationManager/updatelocation',edit,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })

}


getAllTickets () {
  return this.http.get<any>('https://10.10.20.44:3000/RequestManager/allrequests')
}

getType () {
  let listmstid = 5;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/ListDataDetail/getCodeByMasterID',{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 
}

getPriority () {
  let listmstid = 1;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/ListDataDetail/getCodeByMasterID',{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

getDeviceType () {
  let listmstid = 2;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/ListDataDetail/getCodeByMasterID',{ listmstid },{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 
}

filterTickets (filterPayLoad : any) {
   const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/RequestManager/filter',filterPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 

}

filteredTickets (filterPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0] 
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/RequestManager/filter',filterPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

getRequestByID (ticket : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/RequestManager/requestbyid', ticket,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 
}

getDevices (data : any) {
  let listmstid = data ;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/ListDataDetail/getCodeByMasterID', {listmstid},{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

getAllLocations () {
  return  this.http.get<any>('https://10.10.20.44:3000/LocationManager')
}

getRequestStatuses () {
  let listmstid = 6 ;
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/ListDataDetail/getCodeByMasterID', {listmstid},{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })

}

createRequest (addDraftRequestPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/RequestManager/createrequest', addDraftRequestPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
 
}

updateRequest (updatePayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/RequestManager/updaterequest', updatePayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })


}

mgrResponse (managerResponse : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/RequestManager/updaterequest', managerResponse,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

CABresponse (CABresponse : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/RequestManager/updaterequest', CABresponse,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })

}

closeTicketById (closeTicketPayLoad : any) {
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.post('https://10.10.20.44:3000/RequestManager/updaterequest', closeTicketPayLoad,{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })


}

ticketSequence () {
 
  const acc = msal.instance.getAllAccounts()[0]
  return msal.instance.acquireTokenSilent({account:acc,scopes:[]}).then((response)=>{
    console.log('repsonse ---',response)
    return this.http.get('https://10.10.20.44:3000/RequestManager/ticketid',{headers:{
      'Authorization':`Bearer ${response.idToken}`
    }})
  })
  
}

}



