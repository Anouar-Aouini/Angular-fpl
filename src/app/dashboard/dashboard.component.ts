import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';
import { BookService } from '../book.service';
import { CategorySrervice } from '../category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public successMessage = {msg:"",showSuccess:false};
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  constructor(public categoryService: CategorySrervice,
              public bookService: BookService,
              private modalService: NgbModal,
              public userService: UserService) { }
  public profileModal = { firstName: "", lastName: "", password: "" };
  public completedProfile: boolean = false;
  public closeResult = '';
  public user?: User;
  public idUser?: number;
  public myBooks?: number;
  public myCategories?:number;
  ngOnInit(): void {
    this.userService.activeUser().subscribe(data => {
      this.user = data;
      this.profileModal = {
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        password: ""
      }
    this.idUser = this.user.id;
    this.categoryService.getCategories().subscribe(data => {
    this.myCategories = data.filter(el => +el.user_id == this.idUser).length;
    })
    this.bookService.getBooks().subscribe(data => {
    this.myBooks = data.filter(el => el.user.id == this.idUser).length;
    })
    });
  }
  onSubmitUpdate() {
    this.userService.updateUser(this.profileModal, this.user!.id).subscribe(data => {
      this.user = data.user;
      this.successMessage = { msg :"User profile successfully updated!", showSuccess: true }
      setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    })
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
