import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../models/video';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css'],
})
export class VideoEditComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) {}

  @Input() inputVideos!: Video[];
  videos: Video[] = [];
  newVideos: Video[] = [];
  editedVideos: Video[] = [];
  deleteVideos: string[] = [];
  newVideo: Video = { id: '', source: '', title: '' };
  video: Video = { id: '', source: '', title: '' };

  ngOnInit(): void {
    this.videos = this.inputVideos;
  }
  addEditVideo(video: any) {
    this.video = video;
  }
  onNewVideoSubmit() {
    this.videos.push(this.newVideo);
    this.newVideos.push(this.newVideo);
    this.newVideo = { id: '', source: '', title: '' };
  }
  onEditVideoSubmit() {
    this.editedVideos.push(this.video);
    this.video = { id: '', source: '', title: '' };
  }
  deleteVideo(videoId: string) {
    this.deleteVideos.push(videoId);
    this.videos = this.videos.filter(function (video) {
      return video.id !== videoId;
    });
  }
  saveChanges() {
    this.profileService
      .updateVideos({
        addVideos: this.newVideos,
        editVideos: this.editedVideos,
        deleteVideos: this.deleteVideos,
      })
      .subscribe(
        (data) => {
          console.log(data);
          window.location.reload();
        },
        (err) => {
          console.log(err.error);
        }
      );
  }
}
