import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FormControl, Validators} from '@angular/forms';
import {Credential} from '../../models/login-models';

@Component({
  selector: 'vote-login',
  template: `
    <div class="login-form">
      <mat-form-field>
        <input matInput type="email" [formControl]="emailFormControl">
        <mat-error *ngIf="emailFormControl.invalid">Please enter a valid email address.</mat-error>
      </mat-form-field>
      <mat-form-field>
        <input matInput type="password" [formControl]="passwordFormControl">
        <mat-error *ngIf="passwordFormControl.invalid">Please enter your password.</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary"
              [disabled]="emailFormControl.invalid || passwordFormControl.invalid"
              (click)="handleLoginClicked()">
        Login
      </button>
      <h1 *ngIf="loginSuccess">Login Success!</h1>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  loginSuccess = false;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  handleLoginClicked() {
    const credential: Credential = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    };
    this.loginService.login(credential).subscribe(
      data => this.loginSuccess = true,
      (error) => console.log(error)
      );
  }

}
