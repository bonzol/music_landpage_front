import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../models/profile';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit {
  constructor(private router: Router, private adminService: AdminService) {}

  artists: Profile[] = [];
  dataLoad: boolean = false;

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this.adminService.getArtists().subscribe(
      (data) => {
        this.artists = data;
        this.dataLoad = true;
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  deleteArtist(id: string) {
    this.adminService.deleteArtist(id).subscribe(
      () => {
        window.location.reload();
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
