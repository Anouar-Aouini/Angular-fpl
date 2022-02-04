import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router){}
  canActivate(): boolean{
    if (JSON.parse(<string>localStorage.getItem("token"))) {
      return true;
    } else {
      this.router.navigate(["/register"]);
      return false;
    }
  }
}
