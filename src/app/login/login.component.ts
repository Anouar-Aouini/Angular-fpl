import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,public router:Router,public userService:UserService) { }
  public loginForm!: FormGroup;
  public errorMessage = {msg:"",show:false};
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]],
      });
  }

  onSubmitLogin() {
    let user = {email: this.loginForm.value.email,password: this.loginForm.value.password};
    this.userService.login(user).subscribe(data => {
      localStorage.setItem("token", JSON.stringify("Bearer " + data.token));
      this.router.navigate(['/auth/dashboard']);
    }, () => {
      this.errorMessage = { msg: "Bad credentials", show: true }
      setTimeout(() => this.errorMessage={ msg: "", show: false }, 3000)
    });
      this.loginForm.reset();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
