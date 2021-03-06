import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './category/category.module';

@Injectable({
  providedIn: 'root'
})
export class CategorySrervice {
  public url: string ="http://localhost:9000/api/v1";
  constructor(public http: HttpClient) { }
    getCategories() {
    return this.http.get<Category[]>(this.url+"/category/")
    }
    getCategoryById(id:number) {
    return this.http.get<any>(this.url+"/category/"+id)
    }
    addCategory(category:{categoryName:string,user_id:number}) {
    return this.http.post(this.url+"/category/",category)
    }
    deleteCategory(id:number) {
    return this.http.delete(this.url+"/category/"+id)
    }

}
