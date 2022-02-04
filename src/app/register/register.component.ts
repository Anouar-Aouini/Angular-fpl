import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../password.validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder,public router:Router,public userService : UserService) { }
  public registerForm!: FormGroup;
  public role: string = "user";
  public errorMessage = { msg: "", show: false };
  public successMessage = {msg:"",showSuccess:false};
  ngOnInit(): void {
      this.registerForm = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["",[ Validators.required, Validators.minLength(6)]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
      }, { validator: PasswordValidator });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
    get lastName() {
    return this.registerForm.get('lastName');
   }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmitRegister() {
    console.log(this.role);
  let user =  {
  email: this.registerForm.value.email,
  firstName: this.registerForm.value.firstName,
  lastName: this.registerForm.value.lastName,
  password: this.registerForm.value.password,
  roles: [
      this.role
  ]
    }
    this.userService.register(user).subscribe(() => {
      this.successMessage = { msg :"User registered successfully!", showSuccess: true }
      setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    }, error => {
      this.errorMessage = { msg: error.error.message, show: true }
      setTimeout(() => this.errorMessage={ msg: "", show: false }, 3000)
    })
    this.registerForm.reset();
  }
}
