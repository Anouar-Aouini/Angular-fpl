import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit ,OnChanges{
  @Input() public search: string="";
  public users?: User[]
  public email: string = "";
  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.filter(el=>el.roles[0].name != "ADMIN")
    });
    this.userService.current().subscribe(data => this.email = data.message);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.search.currentValue.length > 0) {
      this.userService.getFilteredUsers(changes.search.currentValue).subscribe(data => {
      this.users = data.filter(el=>el.roles[0].name != "ADMIN")
      })
    } else {
      this.userService.getUsers().subscribe(data => {
      this.users = data.filter(el=>el.roles[0].name != "ADMIN")
      });
    }
  }
  approveSubscription(id: number) {
    this.userService.approveSubscription(id).subscribe(data => {
      this.userService.getUsers().subscribe(data => {
        this.users = data.filter(el=>el.roles[0].name != "ADMIN")
      })
    })
  }

}
