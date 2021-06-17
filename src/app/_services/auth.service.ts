import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.authURL;

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      accept: 'application/son'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'authentication_token', {
      login,
      password
    }, httpOptions);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(AUTH_API + 'token/refresh', {
      refresh_token: refreshToken
    }, httpOptions);
  }

  public isAuthenticated(): boolean {
    return this.tokenService.getUser().username !== undefined;
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

}
