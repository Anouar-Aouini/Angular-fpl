import { Component, OnInit } from '@angular/core';
import { CategorySrervice } from './../category.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public successMessage = {msg:"",showSuccess:false};
  public param: { id: number }={ id: 0 };
  constructor(public categoryService: CategorySrervice, public route: ActivatedRoute) { }

  ngOnInit(): void {
  this.param = {
  id: this.route.snapshot.params["id"],
  }
  }

  addTag(categoryForm: NgForm) {
    let name = categoryForm.value;
    name.user_id = +this.param.id;
    this.categoryService.addCategory(name).subscribe((data) => {
      this.successMessage = { msg :"Category successfully added!", showSuccess: true }
      setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    });
    categoryForm.resetForm();
  }
}
