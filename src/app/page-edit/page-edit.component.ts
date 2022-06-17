import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../models/album';
import { Link } from '../models/link';
import { Profile } from '../models/profile';
import { Text } from '../models/text';
import { Video } from '../models/video';
import { ProfileService } from '../services/profile.service';
import { DateConverter } from '../util/DateConverter';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css'],
})
export class PageEditComponent implements OnInit {
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private dateConverter: DateConverter
  ) {}

  profile!: Profile;
  texts!: Text[];
  videos: Video[] = [];
  albums: Album[] = [];
  links: Link[] = [];
  startTexts: string[] = [];
  middleTexts: string[] = [];
  endTexts: string[] = [];
  loadData: boolean = false;

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this.router.navigate(['']);
    this.getArtist();
  }

  public getArtist() {
    this.profileService.getArtist().subscribe(
      (artist) => {
        this.profile = artist;
        this.texts = artist.texts;
        this.convertProfile(artist);
      },
      (err) => {
        console.log(err);
        if (err.status == 404) this.router.navigate(['/errorNotFound']);
      }
    );
  }
  convertProfile(artist: any) {
    this.profile.artistname = artist.artistname;
    this.sortTexts(artist.texts);
    this.profile.lang = artist.lang;
    this.albums = artist.albums;
    this.albums.map((album) => {
      album.date = new Date(album.date);
      album.displayDate = this.dateConverter.dateConverter(
        album.date.getFullYear(),
        album.date.getMonth(),
        artist.lang
      );
    });
    this.videos = artist.videos;
    this.links = artist.links;
    this.loadData = true;
  }
  public logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  sortTexts(texts: Text[]) {
    texts.forEach((text) => {
      switch (text.placement) {
        case 'start':
          this.startTexts.push(text.paragraph);
          break;
        case 'middle':
          this.middleTexts.push(text.paragraph);
          break;
        case 'end':
          this.endTexts.push(text.paragraph);
          break;
      }
    });
  }
}
