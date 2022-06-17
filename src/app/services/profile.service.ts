import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  API_URL = 'https://musiclandpage-server.herokuapp.com/artist';
  // API_URL = 'http://localhost:3000/artist';

  token = localStorage.getItem('token');
  theHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
  options = { headers: this.theHeaders };

  public getArtist(): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.get<any>(
      this.API_URL + '/artist',
      this.options
    );
    return ObservableOfMe;
  }
  public editArtist(
    username: string,
    artistname: string,
    lang: string
  ): Observable<any> {
    const artist = { username: username, artistname: artistname, lang: lang };
    let ObservableOfMe: Observable<any> = this.httpClient.put<any>(
      this.API_URL + '/edit-artist',
      artist,
      this.options
    );
    return ObservableOfMe;
  }
  public getAlbums(): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.get<any>(
      this.API_URL + '/albums',
      this.options
    );
    return ObservableOfMe;
  }
  public getTexts(): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.get<any>(
      this.API_URL + '/texts',
      this.options
    );
    return ObservableOfMe;
  }
  public updateAlbums(updateAlbums: any): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/update-albums',
      updateAlbums,
      this.options
    );
    return ObservableOfMe;
  }
  public updateTexts(updateTexts: any): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/update-texts',
      updateTexts,
      this.options
    );
    return ObservableOfMe;
  }
  public updateVideos(updateVideos: any): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/update-videos',
      updateVideos,
      this.options
    );
    return ObservableOfMe;
  }
  public updateLinks(updateLinks: any): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/update-links',
      updateLinks,
      this.options
    );
    return ObservableOfMe;
  }
  public deleteAlbums(deletedAlbums: string[]): Observable<any> {
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/delete-albums',
      deletedAlbums,
      this.options
    );
    return ObservableOfMe;
  }
}
