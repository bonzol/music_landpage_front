import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Text } from '../models/text';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css'],
})
export class TextEditComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) {}
  @Input() inputTexts!: Text[];
  texts: Text[] = [];
  newTexts: Text[] = [];
  editedTexts: Text[] = [];
  deleteTexts: string[] = [];
  newText: Text = { id: '', paragraph: '', placement: 'start' };
  text: Text = { id: '', paragraph: '', placement: 'start' };

  ngOnInit(): void {
    this.texts = this.inputTexts;
  }
  addEditText(text: any) {
    this.text = text;
  }
  onNewTextSubmit() {
    this.texts.push(this.newText);
    this.newTexts.push(this.newText);
    this.newText = { id: '', paragraph: '', placement: 'start' };
  }
  onEditTextSubmit() {
    this.editedTexts.push(this.text);
    this.text = { id: '', paragraph: '', placement: 'start' };
  }
  deleteText(textId: string) {
    this.deleteTexts.push(textId);
    this.texts = this.texts.filter(function (text) {
      return text.id !== textId;
    });
  }
  saveChanges() {
    this.profileService
      .updateTexts({
        addTexts: this.newTexts,
        editTexts: this.editedTexts,
        deleteTexts: this.deleteTexts,
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
