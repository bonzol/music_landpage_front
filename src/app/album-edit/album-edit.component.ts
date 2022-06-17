import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Album } from '../models/album';
import { Song } from '../models/song';
import { ProfileService } from '../services/profile.service';
import { DateConverter } from '../util/DateConverter';

@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css'],
})
export class AlbumEditComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) {}

  @Input() inputAlbums!: Album[];
  albums: Album[] = [];
  album: Album = {
    title: '',
    date: new Date(),
    displayDate: '',
    img: '',
    link: '',
    songs: [],
    id: '',
  };
  newAlbum: Album = {
    title: '',
    date: new Date(),
    displayDate: '',
    img: '',
    link: '',
    songs: [],
    id: '',
  };
  editAlbums: Album[] = [];
  addAlbums: Album[] = [];
  deleteAlbums: string[] = [];
  songs: Song[] = [];

  ngOnInit(): void {
    this.albums = this.inputAlbums;
  }
  addDeletedAlbum(id: string) {
    this.deleteAlbums.push(id);
    this.albums = this.albums.filter(function (album) {
      return album.id !== id;
    });
    console.log(this.albums);
  }
  onSongsSubmit() {
    this.album.songs = [...this.songs];
    var foundedId = null;

    for (let i = 0; i < this.editAlbums.length; i++) {
      if (this.editAlbums[i].id == this.album.id) {
        foundedId = i;
        break;
      }
    }
    if (foundedId != null) {
      this.editAlbums[foundedId] = this.album;
    } else {
      this.editAlbums.push(this.album);
    }
    this.songs = [];
  }
  editSongs(album: Album) {
    this.album = album;
    this.songs = this.album.songs;
  }
  addNewSong() {
    this.songs.push({ title: '', id: '' });
  }
  saveChanges() {
    console.log({
      addAlbums: this.addAlbums,
      editAlbums: this.editAlbums,
      deleteAlbums: this.deleteAlbums,
    });

    this.profileService
      .updateAlbums({
        addAlbums: this.addAlbums,
        editAlbums: this.editAlbums,
        deleteAlbums: this.deleteAlbums,
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
  onAlbumSubmit(albumForm: any, editedAlbum: Album) {
    if (albumForm.form.value.date != '') {
      this.album.date = new Date(albumForm.form.value.date);
    }
    var foundedId = null;
    for (let i = 0; i < this.editAlbums.length; i++) {
      if (this.editAlbums[i].id == editedAlbum.id) {
        foundedId = i;
        break;
      }
    }
    if (foundedId != null) {
      this.editAlbums[foundedId] = editedAlbum;
    } else {
      this.editAlbums.push(editedAlbum);
    }
  }
  deleteSongFromForm(song:any) {
    const deleteSongIndex = this.songs.indexOf(song);
    this.songs.splice(deleteSongIndex, 1);
  }
  onNewAlbumSubmit() {
    this.albums.push(this.newAlbum);
    this.addAlbums.push(this.newAlbum);
    this.newAlbum = {
      title: '',
      date: new Date(),
      displayDate: '',
      img: '',
      link: '',
      songs: [],
      id: '',
    };
    console.log(this.addAlbums);
  }

  public addAlbumToModal(albumId: string) {
    this.album = this.albums.find((album) => {
      return album.id == albumId;
    })!;
  }
}
