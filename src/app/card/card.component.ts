import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {userIdToken} from '../../app/header/header.component';
import { FormGroup, FormControl ,FormBuilder} from '@angular/forms';
import { node_url } from 'src/environments/environment';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  headers = new HttpHeaders({'Authorization':`Bearer ${userIdToken}`});

 rapid:any;
 locationList : any ;
 ticketInfo:any = []
 searchFormGroup:any = []
 location1:any =[]
 location2:any =[]
 location3:any =[]
 location4:any =[]
 addResponse:any
  some:any;

  constructor( private common:CommonService ,  private http:HttpClient, private fb:FormBuilder)
   {}

   
  
   addLocation = this.fb.group({
    country: [''],
    locationid: [''],
    state: [''],
    locname: [''],
    zipcode: ['']
   }) 


   filterLocation = this.fb.group({
    country: [''],
    locationid: [''],
    state: [''],
    locname: [''],
    zipcode: ['']
   })

   editLocation = this.fb.group({
    country: [''],
    locationid: [''],
    state: [''],
    locname: [''],
    zipcode: ['']
   })

  


ngOnInit(): void {
  this.getLocationDropdown();
 }



 
 
addLoc(data:any){
  this.common.addLocation(data.value).then((add)=>{
    add.subscribe((res)=>{
      console.log(res);
    })
    this.some = setTimeout(() => {
    this.getLocationDropdown();
  }, 1000)
  })

}


clearform() {
  this.addLocation.reset();
  this.getLocationDropdown();
}

clearForm(){
  this.filterLocation.reset();
  this.getLocationDropdown();
}

filterloc(flocation:any){
  console.log(flocation.value);
  this.common.filterLocation(flocation.value).then((filter)=>{
    filter.subscribe((data)=>{
      this.locationList = data;
    this.locationList = this.locationList.result; 
   
    })
    
  })
 
}

locationid:any;
getLocationid(x:any){

   this.locationid=x;
    console.log(this.locationid); 
  }

 
deleteLoc(){
  let locid = {"locationid":this.locationid};
  this.common.deleteLocation(locid).subscribe((result)=>
  {
    console.log(result);
  })
  this.some = setTimeout(() => {
    this.getLocationDropdown();
  }, 1000)
}

edit(editform:any){
   this.common.editLocation(editform.value).then((edit)=>{
    edit.subscribe((val)=>{
      console.log(val);
    })
    this.some = setTimeout(() => {
    this.getLocationDropdown();
  }, 1000)
  })
 
}

setloc(data:any){
 
    this.editLocation.controls['country'].setValue(data.country);
    this.editLocation.controls['locationid'].setValue(data.locationid);
    this.editLocation.controls['state'].setValue(data.state);
    this.editLocation.controls['locname'].setValue(data.locname);
    this.editLocation.controls['zipcode'].setValue(data.zipcode);
    this.some = setTimeout(() => {
      this.getLocationDropdown();
    }, 1000)
}


  
 getLocationDropdown() : void {
 
    this.http.get<any>(`${node_url}/LocationManager`)
      .subscribe( response => 
       {
        this.locationList = response.result; 
      
         
         } );
       }
}


