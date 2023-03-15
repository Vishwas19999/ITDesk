import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl ,FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

 rapid:any;
 locationList : any ;
 ticketInfo:any = []
 searchFormGroup:any = []
 location1:any =[]
 location2:any =[]
 location3:any =[]
 location4:any =[]
 addResponse:any

  constructor( private common:CommonService ,  private http:HttpClient, private fb:FormBuilder)
   {
   }

   
  
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

  
//  ticketInf9o:any[] = this.ticketService.ticketInfo;

ngOnInit(): void {
  this.getLocationDropdown();
 }


//  addLoc() : void{
//   this.location1 = this.addLocation.controls['country'].value;
//   this.location2 = this.addLocation.controls['locname'].value;
//   this.location3 = this.addLocation.controls['state'].value;
//   this.location4 = this.addLocation.controls['zipcode'].value;
//   let addLocationData = {locname:this.location2 , state:this.location3 , zipcode:this.location4, country:this.location1}

//   this.http.post<any>('http://localhost:3000/LocationManager/add' , addLocationData )
//   .subscribe( response => 
//    {
//     this.addResponse = response; 
//    this.ticketInfo =this.locationList;
//     console.log(this.locationList);
//      console.log("addData", addLocationData);
     
//    } );
//    }
 
 
addLoc(data:any){
  this.common.addLocation(data.value).subscribe((res)=>{
    console.log(res);
  })
}

filterloc(flocation:any){
  console.log(flocation.value);
  this.common.filterLocation(flocation.value).subscribe((data)=>{
    this.locationList = data;
    this.locationList = this.locationList.result; 
    console.log(data);
  })
}

locationid:any;
getLocationid(x:any){
  debugger;
   this.locationid=x;
    console.log(this.locationid); 
  }

 
deleteLoc(){
  let locid = {"locationid":this.locationid};
  this.common.deleteLocation(locid).subscribe((result)=>
  {
    console.log(result);
  })
}

edit(editform:any){
  console.log(editform.value);
   this.common.editLocation(editform.value).subscribe((val)=>
  {
    console.log(val);
  }
  )}

setloc(data:any){
   debugger; 
    this.editLocation.controls['country'].setValue(data.country);
    this.editLocation.controls['locationid'].setValue(data.locationid);
    this.editLocation.controls['state'].setValue(data.state);
    this.editLocation.controls['locname'].setValue(data.locname);
    this.editLocation.controls['zipcode'].setValue(data.zipcode);
}


  
 getLocationDropdown() : void {
 
    this.http.get<any>('http://localhost:3000/LocationManager')
      .subscribe( response => 
       {
        this.locationList = response.result; 
      //  this.ticketInfo =this.locationList;
        //console.log(this.locationList);
         console.log( this.locationList);
       } );
       }

 


}


