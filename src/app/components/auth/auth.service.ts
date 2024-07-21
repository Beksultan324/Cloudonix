import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(loginValue: string) {
    this.setAuthToken(loginValue);
  }

  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  }
}
