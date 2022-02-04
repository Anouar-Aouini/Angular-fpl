import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AuthGuard } from './auth.guard';
import { BookByCategoryComponent } from './book-by-category/book-by-category.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooklistComponent } from './booklist/booklist.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'auth', component: NavbarComponent,canActivate: [AuthGuard], children: [
  { path: "list", component: UserlistComponent },
  { path: "books", component: BooklistComponent },
  { path: "categories", component: CategoryComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "categories/:id", component: BookByCategoryComponent },
  { path: "books/:id", component: BookDetailsComponent },
  { path: "categories/add/category", component: AddCategoryComponent },
  { path: "categories/addbook/:id", component: AddBookComponent }
  ]},
  { path: "**" , component : PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
