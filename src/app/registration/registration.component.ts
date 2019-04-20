import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { RegisterService } from '../register.service'
import { AlertService } from '../alert.service'
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    registerForm = this.formBuilder.group({
    full_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private registerService:RegisterService,
    private alertService: AlertService,
    private router: Router,
    ) { }

  ngOnInit() {
    
  }


    onSubmit() {

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.registerService.CreateUser(this.registerForm.value)
            // .pipe(first())
            .subscribe(
                data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/']);
                },
                error => {
                  
                });
    }
}
