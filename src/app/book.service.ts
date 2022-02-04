import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './booklist/post.module';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public url: string ="http://localhost:8080/api/v1";
  constructor(public http: HttpClient) { }
    getBooks() {
    return this.http.get<Book[]>(this.url+"/book/")
    }
    addBook(id:number , post:any) {
    return this.http.post<Book>(this.url+"/book/"+id,post)
    }
    updateBook(id:number , updatedPost:{title:string,description:string}) {
    return this.http.put<{message:string,post:Book}>(this.url+"/book/"+id,updatedPost)
    }
    deleteBook(id:number) {
    return this.http.delete<{message:string,books:Book[]}>(this.url+"/book/"+id)
    }
    getFilteredBook(search:string): Observable<Book[]>{
    return this.http.get<Book[]>(this.url+"/book/search-by-title/"+search)
  }
}
