import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  API_URL = 'https://musiclandpage-server.herokuapp.com/';
  // API_URL = 'http://localhost:3000/'

  constructor(private httpClient: HttpClient) {}

  public getArtists(username: string): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.get<any>(
      this.API_URL + username
    );
    return ObservableOfMe;
  }
}
