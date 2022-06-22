import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  API_URL = 'https://musiclandpage-server.herokuapp.com/admin';

  constructor(private httpClient: HttpClient) {}
  public getArtists(): Observable<any> {
    let token = localStorage.getItem('token');
    let theHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let options = { headers: theHeaders };
    let ObservableOfMe: Observable<any> = this.httpClient.get<any>(
      this.API_URL + '/artists',
      options
    );
    return ObservableOfMe;
  }
  public deleteArtist(id:string): Observable<any> {
    let token = localStorage.getItem('token');
    let theHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let options = { headers: theHeaders };
    let ObservableOfMe: Observable<any> = this.httpClient.delete<any>(
      this.API_URL + '/artists/delete-artist/'+id,
      options
    );
    return ObservableOfMe;
  }
}
