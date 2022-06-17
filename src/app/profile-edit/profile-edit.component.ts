import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  @Input() inputProfile!: Profile;
  artistname: string = '';
  username: string = '';
  link: string = '';
  lang: string = 'heb';
  @ViewChild('artistnameForm') artistnameForm: any;
  usernameForm: FormGroup = this.fb.group({
    username: [
      this.username,
      {
        validators: [Validators.required, this.spacesValidator],
        asyncValidators: [this.usernameValidator(this.authService)],
        updateOn: 'blur',
      },
    ],
  });
  ngOnInit(): void {
    this.convertProfile(this.inputProfile);
    this.getUrl();
  }

  onUsernameSubmit() {
    this.username = this.usernameForm.value.username;
  }
  onArtistnameSubmit() {
    this.artistname = this.artistnameForm.form.value.artistname;
  }
  public getUrl() {
    this.link = window.location.href.split('/edit')[0];
  }
  spacesValidator(control: AbstractControl) {
    const username = control.value;
    if (username.indexOf(' ') >= 0) {
      return { spaces: true };
    } else {
      return null!;
    }
  }
  usernameValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      document.getElementById('spinnerUsername')?.classList.remove('disable');
      return authService.checkUsername(control.value).pipe(
        map((result: boolean) => {
          if (result) {
            document
              .getElementById('spinnerUsername')
              ?.classList.add('disable');
            return { usernameAlreadyExists: true };
          } else {
            document
              .getElementById('spinnerUsername')
              ?.classList.add('disable');
            return null!;
          }
        })
      );
    };
  }
  convertProfile(profile: Profile) {
    this.artistname = profile.artistname;
    this.username = profile.username;
    this.lang = profile.lang;
    localStorage.setItem('lang', this.lang);
  }

  public saveChanges() {
    localStorage.setItem('username', this.username);
    this.profileService
      .editArtist(this.username, this.artistname, this.lang)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
