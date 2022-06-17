import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  email: string = '';
  password: string = '';

  error = null;

  ngOnInit(): void {
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
      this.router.navigate(['/' + localStorage.getItem('username') + '/edit']);
    }
  }

  public login() {
    if (this.email == '' || this.password == '') return;
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        localStorage.clear();
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username);
        this.router.navigate(['/' + data.username + '/edit']);
      },
      (err) => {
        this.error = err.error.text;
        console.log(err.error.text);
      }
    );
  }

 
}

