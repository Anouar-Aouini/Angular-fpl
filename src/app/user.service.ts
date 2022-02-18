import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './userlist/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string ="http://localhost:9000/api/v1";
  constructor(public http: HttpClient) { }
  login(user:{email:string,password:string}) {
    return this.http.post<{token:string,email:string}>(this.url + "/auth/login", user);
  }
  register(user: any) {
    console.log(user);
    return this.http.post(this.url + "/auth/register", user);
  }
    activeUser() {

    return this.http.get<User>(this.url + "/auth/activeuser");
  }
  current() {

    return this.http.get<{message:string}>(this.url + "/auth/currentuser");
  }
  deleteUser(id: number) {

     this.http.delete<User[]>(this.url + "/users/" + id)
      .subscribe();
   return this.getUsers().subscribe();
  }
  getUsers(): Observable<User[]>{

    return this.http.get<User[]>(this.url+"/users/")
  }
    getFilteredUsers(search:string): Observable<User[]>{

    return this.http.get<User[]>(this.url+"/users/search/"+search)
  }
  addPosition(p_name:{}) {
    return this.http.post(this.url + "/positions", p_name);
  }
  addUser(user:User) {
    return this.http.post<User>(this.url + "/users", user).subscribe(data => console.log(data));
  }
  getRoles() {

    return this.http.get(this.url+"/roles/")
  }
  updateUser(user:{firstName:string,lastName:string,password:string},id:number):Observable<{user:User}> {

    return this.http.put<{message:string,user:User}>(this.url+"/users/"+id,user)
  }
  approveSubscription(id: number) {
    return this.http.put(this.url+"/users/approve/"+id,"")
  }
  demandPermission() {
    return this.http.put<{message:string}>(this.url + "/users/demand-subscription", "");
  }

}
