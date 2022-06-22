import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Link } from '../models/link';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-link-edit',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.css'],
})
export class LinkEditComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) {}
  @Input() inputLinks!: Link[];
  links: Link[] = [];
  newLinks: Link[] = [];
  editedLinks: Link[] = [];
  deleteLinks: string[] = [];
  newLink: Link = { id: '', link: '', company: 'other', title: '' };
  link: Link = { id: '', link: '', company: '', title: '' };

  ngOnInit(): void {
    this.links = JSON.parse(JSON.stringify(this.inputLinks));
  }
  addEditLink(link: any) {
    this.link = link;
  }
  onNewLinkSubmit() {
    this.links.push(this.newLink);
    this.newLinks.push(this.newLink);
    this.newLink = { id: '', link: '', company: 'other', title: '' };
  }
  onEditLinkSubmit() {
    this.editedLinks.push(this.link);
    this.link = { id: '', link: '', company: '', title: '' };
  }
  deleteLink(linkId: string) {
    this.deleteLinks.push(linkId);
    this.links = this.links.filter(function (link) {
      return link.id !== linkId;
    });
  }
  saveChanges() {
    this.profileService
      .updateLinks({
        addLinks: this.newLinks,
        editLinks: this.editedLinks,
        deleteLinks: this.deleteLinks,
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
