import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public successMessage = {msg:"",showSuccess:false};
  public param: { id: number} = { id: 0 }
  constructor(public route : ActivatedRoute,public bookservice : BookService) { }

  ngOnInit(): void {
      this.param = {
      id: this.route.snapshot.params["id"],
      }
  }
  async addBook(bookForm: NgForm) {
    let pdf = await this.convertImage();
    let book = bookForm.value;
    book.content = pdf;
    this.bookservice.addBook(this.param.id, book).subscribe(()=>{
      this.successMessage = { msg :"Book successfully added!", showSuccess: true }
      setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    });
    bookForm.resetForm();
  }
  public file: File | null = null;
  onChange(event:any) {
    this.file = event.target.files[0];
  }
  convertImage() : Promise<string> {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        var srcData : any = fileLoadedEvent.target!.result;
        resolve(srcData)
      }
      fileReader.readAsDataURL(<File> this.file);
    })
  }

}
