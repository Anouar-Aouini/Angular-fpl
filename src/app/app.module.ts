import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserlistComponent } from './userlist/userlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import { ListComponent } from './list/list.component';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './auth.interceptor';
import { AddBookComponent } from './add-book/add-book.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { BookByCategoryComponent } from './book-by-category/book-by-category.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooklistComponent } from './booklist/booklist.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserlistComponent,
    RegisterComponent,
    LoginComponent,
    ListComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AddBookComponent,
    AddCategoryComponent,
    BookByCategoryComponent,
    BookDetailsComponent,
    BooklistComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi : true
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
