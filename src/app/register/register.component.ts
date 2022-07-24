import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  msgRegsiter!: string;
  regsterForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
      Validators.pattern(/^[A-Z][\w]{1,16}$/),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(10),
      Validators.max(80),
    ]),
  });
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {}
  submitRegister(formData: FormGroup): void {
    this.loading = true;
    this._AuthService.registrationApi(formData.value).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this._Router.navigate(['/login']);
        } else {
          this.msgRegsiter = response.message;
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
