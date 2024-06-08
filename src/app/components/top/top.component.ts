import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  public user: any={};

  constructor(private router : Router) { 
    let str_user: any = localStorage.getItem('user');
    this.user = JSON.parse(str_user);
  }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['']).finally(() => {window.location.reload()});
  }

}
