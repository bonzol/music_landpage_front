import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private profileService:ProfileService) { }

  @Input() profile!: Profile;


  name: string = ''

  ngOnInit(): void {
    // this.getProfileName()
  }

  // public async getProfileName() {
  //   this.name = this.profileService.getProfie().name;
  // }
}
