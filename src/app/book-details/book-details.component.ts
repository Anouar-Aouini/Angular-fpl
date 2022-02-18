import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';
import { Book } from '../booklist/post.module';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';
import { DownloadService } from './../download.service';

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
  public user?: User;
  public id: string = "";
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  public comments: any;
  public users?: User[];
  public activeUser?: User;
  constructor(private modalService: NgbModal,
  public route: ActivatedRoute,
  public bookService: BookService,
  public userService: UserService,
  public downloadService:DownloadService) { }

  ngOnInit(): void {
          this.param = {
          id: this.route.snapshot.params["id"],
          }
    this.bookService.getBooks().subscribe(data => {
      this.book = data.filter(el => el.id == this.param?.id)[0];
    })
    this.userService.activeUser().subscribe(data => {
      this.user = data;
      this.id = data.id + "";
    });
  }
  userName(comment:any) {
    let firstName = this.users?.filter(el => el.id == + comment.user_id)[0].firstName;
    return firstName;
  }
    get text() {
    return this.commentForm.get('text');
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

  downloadPdf(fileName:string) {
    const source = this.book!.content;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }
  onClickDownloadPdf(book:any) {
    this.downloadService.downloadBook(book.id).subscribe(data => {
  })
    this.downloadPdf(book.title);
  }

}
