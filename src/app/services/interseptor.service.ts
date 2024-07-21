import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterseptorService implements HttpInterceptor {
  private readonly authToken = localStorage.getItem("authToken");

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${this.authToken!}` },
    });
    return next.handle(authReq);
  }
}
