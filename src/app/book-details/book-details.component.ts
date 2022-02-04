import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';
import { Book } from '../booklist/post.module';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public successMessage = { msg: "", showSuccess: false };
  public updatedBook: { title: string, description: string } = { title: "", description: "" };
  public closeResult = '';
  public commentForm!: FormGroup;
  public param: { id: number }={ id: 0 };
  public book?: Book;
  public id: string = "";
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  public comments: any;
  public users?: User[];
  public activeUser?: User;
  constructor(private modalService: NgbModal,
  private fb: FormBuilder,
  public route: ActivatedRoute,
  public bookService: BookService,
  public userService : UserService) { }

  ngOnInit(): void {
        this.commentForm = this.fb.group({
      text: ["", [Validators.required]],
      });
          this.param = {
          id: this.route.snapshot.params["id"],
          }
    this.bookService.getBooks().subscribe(data => {
      this.book = data.filter(el => el.id == this.param?.id)[0];
      this.updatedBook = { title: this.book.title, description: this.book.description };
    })
    this.userService.activeUser().subscribe(data => this.id = data.id + "");
  }
  userName(comment:any) {
    let firstName = this.users?.filter(el => el.id == + comment.user_id)[0].firstName;
    return firstName;
  }
    get text() {
    return this.commentForm.get('text');
    }
  durationTime(){
    let duration = this.book?.createdAt + "";
    return this.duration(duration)
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
    open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
