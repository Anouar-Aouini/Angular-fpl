import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorySrervice } from '../category.service';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

public successMessage = {msg:"",showSuccess:false};
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  public showSpinner: boolean = false;
  public categories: any = [];
  public activeUser?: User;
  constructor(public categoryService : CategorySrervice,public route:ActivatedRoute,public router:Router,public userService : UserService) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.showSpinner = false;
    })
    this.userService.activeUser().subscribe(data=> {
      this.activeUser = data;
    })

  }
  getBooksByCategory(category:any) {
    this.router.navigate([category.categoryName,{id:category.id}],{relativeTo:this.route});
  }
  addPost(category: any) {
     this.router.navigate(["addbook",category.categoryName,{id:category.id}],{relativeTo:this.route})
  }
  addTag() {
    this.router.navigate(["add/category",{id:this.activeUser?.id}],{relativeTo:this.route})
  }

}
