import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http"
import { Observable } from "rxjs"

export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token : string = JSON.parse(<string>localStorage.getItem("token"));
    if (!token) {
      return next.handle(req)
    } else {
      const cloneReq = req.clone({
      headers: req.headers.set(
        "Authorization",
        token
      ),
    })
    return next.handle(cloneReq)
    }
  }
}
