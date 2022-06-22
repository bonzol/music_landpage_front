import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'https://musiclandpage-server.herokuapp.com/auth';

  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    const auth = { email: email, password: password };
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/login',
      auth
    );
    return ObservableOfMe;
  }

  public signup(
    email: string,
    password: string,
    username: string,
    artistname: string
  ): Observable<any> {
    const auth = {
      email: email,
      password: password,
      username: username,
      artistname: artistname,
    };
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/signup',
      auth
    );
    return ObservableOfMe;
  }

  public checkEmail(email: string): Observable<any> {
    const auth = { email: email };
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/checkEmail',
      auth
    );
    return ObservableOfMe;
  }

  public checkUsername(username: string): Observable<any> {
    const auth = { username: username };
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/checkUsername',
      auth
    );
    return ObservableOfMe;
  }
}
