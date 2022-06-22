import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../models/album';
import { Link } from '../models/link';
import { Profile } from '../models/profile';
import { Text } from '../models/text';
import { Video } from '../models/video';
import { GuestService } from '../services/guest.service';
import { DateConverter } from '../util/DateConverter';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css'],
})
export class LandpageComponent implements OnInit {
  constructor(
    private guestService: GuestService,
    private router: ActivatedRoute,
    private router2: Router,
    private dateConverter: DateConverter
  ) {}

  @Input() inputProfile!: Profile;
  videos: Video[] = [];
  videosToDisplay: Video[] = [];
  albums: Album[] = [];
  profile: Profile = { artistname: '', username: '', lang: '', email:'' };
  links: Link[] = [];
  startTexts: string[] = [];
  middleTexts: string[] = [];
  endTexts: string[] = [];
  usernameUrl: string = this.router.snapshot.paramMap.get('username')!;

  dataLoad: boolean = false;
  isAlbumsExist: boolean = false;

  ngOnInit(): void {
    if (this.inputProfile == undefined) {
      this.getArtist();
    } else {
      this.convertProfile(this.inputProfile);
      this.dataLoad = true;
    }
  }

  convertProfile(artist: any) {
    this.profile.artistname = artist.artistname;
    this.sortTexts(artist.texts);
    this.profile.lang = artist.lang;
    this.albums = artist.albums;
    if(this.albums.length > 0) {
      this.albums.map((album) => {
        album.date = new Date(album.date);
        album.displayDate = this.dateConverter.dateConverter(
          album.date.getFullYear(),
          album.date.getMonth(),
          artist.lang
        );
      });
      this.isAlbumsExist = true;
    }
    this.videos = artist.videos;
    this.videosToDisplay = JSON.parse(JSON.stringify(this.videos));
    this.videosToDisplay.map((v) => {
      v.source = v.source.split('=')[1];
    });
    this.links = artist.links;
  }
  public getArtist() {
    this.guestService.getArtists(this.usernameUrl).subscribe(
      (artist) => {
        this.convertProfile(artist);
        this.dataLoad = true;
      },
      (err) => {
        console.log(err);
        if (err.status == 404) this.router2.navigate(['/errorNotFound']);
      }
    );
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
