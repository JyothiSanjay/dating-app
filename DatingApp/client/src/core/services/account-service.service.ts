import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCred, RegisterCred, User } from '../../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null)

  baseUrl = 'https://localhost:7160/api/';

  login(creds: LoginCred) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(tap(user => {
      if (user) {
        this.setCurrentUser(user);
      }
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  register(creds: RegisterCred) {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(tap(user => {
      if (user) {
        this.setCurrentUser(user);
      }
    }));
  }
}
