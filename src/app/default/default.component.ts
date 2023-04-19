import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { NavigationStart,Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(private common:CommonService,private router:Router) {

   }

  ngOnInit(): void {
    
  }

}
