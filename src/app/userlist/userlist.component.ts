import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { User } from './user.module';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  public search: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
