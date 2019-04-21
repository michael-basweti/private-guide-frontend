import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'
import { Router } from '@angular/router';
import { RegisterService } from '../register.service'
import { AlertService } from '../alert.service'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    submitted = false;
    registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService:RegisterService,
    private alertService: AlertService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required,
                Validators.pattern('(?=.*[a-z])(?=.*[0-9]).{8,}')]]
    });
  }

  get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.registerService.CreateUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.alertService.success('Hey '+data.full_name+' your registration was successful', true);
                  this.router.navigate(['/']);
                  console.log('repsonse',data);
                },
                error => {
                  if(error.error.email){
                    this.alertService.error(error.error.email);
                  }
                  if(error.error.password){
                    this.alertService.error(error.error.password);
                  }
                  if(error.error.full_name){
                    this.alertService.error(error.error.full_name);
                  }
                  console.log('repsonse',error.error.email);
                });
    }
}
