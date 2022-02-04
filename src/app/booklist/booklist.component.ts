import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from './post.module';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  public books?: Book[];
  public user?: User;
  constructor(public bookService:BookService,public userService:UserService,public route : ActivatedRoute, public router : Router) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      console.log(data);
      this.books = data;
    })
    this.userService.activeUser().subscribe(data => this.user = data);
  }
    showDetails(post:Book) {
    this.router.navigate([post.title,{id:post.id}],{relativeTo:this.route})
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
