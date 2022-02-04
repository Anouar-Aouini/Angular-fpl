import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorySrervice } from '../category.service';
import { Book } from '../booklist/post.module';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';

@Component({
  selector: 'app-book-by-category',
  templateUrl: './book-by-category.component.html',
  styleUrls: ['./book-by-category.component.css']
})
export class BookByCategoryComponent implements OnInit {
  public books?: Book[];
  public user?: User;
  public email?: String;
  public date?: Date;
  public timestamp?: string;
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  public param: { id: number} = { id: 0 }
  constructor(public userService: UserService,
    public route: ActivatedRoute, public categoryService: CategorySrervice) { }

  ngOnInit(): void {
    this.date = new Date("milliseconds")
    this.userService.current().subscribe(data=>this.email=data.message)
    this.userService.getUsers().subscribe(data => this.user = data.filter((el)=>el.email===this.email)[0]);
      this.param = {
      id: this.route.snapshot.params["id"],
      }
    this.categoryService.getCategoryById(this.param.id).subscribe(data => {
      console.log(data);
      this.books = data.books;
    })
   // this.userService.getRoles().subscribe(data=>console.log(data))
    // this.userService.getPositions()
  }
  duration(createdAt: string) {
    let timestamp;
    var result = new Date(createdAt).getTime();
    let now = new Date().getTime()
    let difference = now - result;
    var minutes = Math.floor((difference / (1000 * 60)) % 60),
    hours = Math.floor((difference / (1000 * 60 * 60)) % 24),
    days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
    months = Math.floor((difference / (1000 * 60 * 60 * 24 * 30)) % 12),
    years = Math.floor((difference / (1000 * 60 * 60 * 24 * 365)));
  if (years>0){
     timestamp = `${years} y`;
  }else if(months>0){
     timestamp = `${months} m`;
  } else  if (days>0){
     timestamp = `${days} d`;
  }else if(hours>0){
     timestamp = `${hours} h`;
  } else if(minutes>0) {
     timestamp = `${minutes} min`;
  }else {
     timestamp = "just now"
  }
    return timestamp;
}
}
