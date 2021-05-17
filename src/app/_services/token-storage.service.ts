import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const TOKEN_REFRESH_KEY = 'auth-token-refresh';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(USER_KEY);

  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokenRefresh(tokenRefresh: string): void {
    window.sessionStorage.removeItem(TOKEN_REFRESH_KEY);
    window.sessionStorage.setItem(TOKEN_REFRESH_KEY, tokenRefresh);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getTokenRefresh(): string | null {
    return window.sessionStorage.getItem(TOKEN_REFRESH_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
