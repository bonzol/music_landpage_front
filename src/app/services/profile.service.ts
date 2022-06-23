import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  API_URL = 'https://musiclandpage-server.herokuapp.com/artist';

  public getArtist(): Observable<any> {
    let options = this.buildOptions();
    let ObservableOfMe: Observable<any> = this.httpClient.get<any>(
      this.API_URL + '/artist',
      options
    );
    return ObservableOfMe;
  }
  public editArtist(
    username: string,
    artistname: string,
    lang: string
  ): Observable<any> {
    let options = this.buildOptions();
    const artist = { username: username, artistname: artistname, lang: lang };
    let ObservableOfMe: Observable<any> = this.httpClient.put<any>(
      this.API_URL + '/edit-artist',
      artist,
      options
    );
    return ObservableOfMe;
  }
  public getAlbums(): Observable<any> {
    let options = this.buildOptions();
    let ObservableOfMe: Observable<any> = this.httpClient.get<any>(
      this.API_URL + '/albums',
      options
    );
    return ObservableOfMe;
  }
  public getTexts(): Observable<any> {
    let options = this.buildOptions();
    let ObservableOfMe: Observable<any> = this.httpClient.get<any>(
      this.API_URL + '/texts',
      options
    );
    return ObservableOfMe;
  }
  public updateAlbums(updateAlbums: any): Observable<any> {
    let options = this.buildOptions();
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/update-albums',
      updateAlbums,
      options
    );
    return ObservableOfMe;
  }

  public updateTexts(updateTexts: any): Observable<any> {
    let options = this.buildOptions();
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/update-texts',
      updateTexts,
      options
    );
    return ObservableOfMe;
  }
  public updateVideos(updateVideos: any): Observable<any> {
    let options = this.buildOptions();
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/update-videos',
      updateVideos,
      options
    );
    return ObservableOfMe;
  }
  public updateLinks(updateLinks: any): Observable<any> {
    let options = this.buildOptions();
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/update-links',
      updateLinks,
      options
    );
    return ObservableOfMe;
  }
  public deleteAlbums(deletedAlbums: string[]): Observable<any> {
    let options = this.buildOptions();
    let ObservableOfMe: Observable<any> = this.httpClient.post<any>(
      this.API_URL + '/delete-albums',
      deletedAlbums,
      options
    );
    return ObservableOfMe;
  }
  public buildOptions() {
    const token = localStorage.getItem('token');
    const theHeaders = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + token
    );
    return { headers: theHeaders };
  }
}
