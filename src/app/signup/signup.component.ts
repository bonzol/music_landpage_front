import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  emailReg: string = '';
  passwordReg: string = '';
  usernameReg: string = '';
  artistnameReg: string = '';

  formSign: FormGroup = this.fb.group({
    emailReg: [
      null,
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.emailValidator(this.authService)],
        updateOn: 'blur',
      },
    ],
    passwordReg: [null, [Validators.required, Validators.minLength(6)]],
    usernameReg: [
      '',
      {
        validators: [Validators.required, this.spacesValidator],
        asyncValidators: [this.usernameValidator(this.authService)],
        updateOn: 'blur',
      },
    ],
    artistnameReg: [null, { validators: Validators.required }],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  onFormSubmit() {
    this.artistnameReg = this.formSign.value.artistnameReg;
    this.usernameReg = this.formSign.value.usernameReg;
    this.emailReg = this.formSign.value.emailReg;
    this.passwordReg = this.formSign.value.passwordReg;
    this.signup();
  }

  emailValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      document.getElementById('spinnerEmail')?.classList.remove('disable');
      return authService.checkEmail(control.value).pipe(
        map((result: boolean) => {
          if (result) {
            document.getElementById('spinnerEmail')?.classList.add('disable');
            return { emailAlreadyExists: true };
          } else {
            document.getElementById('spinnerEmail')?.classList.add('disable');
            return null!;
          }
        })
      );
    };
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

  spacesValidator(control: AbstractControl) {
    const username = control.value;
    if (username.indexOf(' ') >= 0) {
      return { spaces: true };
    } else {
      return null!;
    }
  }

  signup() {
    if (
      this.emailReg == '' ||
      this.passwordReg == '' ||
      this.artistnameReg == '' ||
      this.usernameReg == ''
    )
      return;
    this.authService
      .signup(
        this.emailReg,
        this.passwordReg,
        this.usernameReg,
        this.artistnameReg
      )
      .subscribe(
        (data) => {
          this.login();
        },
        (err) => {
          console.log(err.error);
        }
      );
  }

  login() {
    if (this.emailReg == '' || this.passwordReg == '') return;
    this.authService.login(this.emailReg, this.passwordReg).subscribe(
      (data) => {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username);
        this.router.navigate(['/' + data.username + '/edit']);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }
}
