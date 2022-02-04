import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../userlist/user.module';
import { UserService } from './../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showFiller: boolean = false;
  public user?: User;
  constructor(public route:Router,public userService : UserService) { }

  ngOnInit(): void {
    this.userService.activeUser().subscribe(data => {
      console.log(data);
      this.user = data;
     })
  }
  logOut() {
    localStorage.removeItem("token");
    this.route.navigate(["/login"])
  }
}
