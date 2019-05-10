import { Component, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';

let token = localStorage.getItem('LoggedInUser')
console.log(`Token ${token}`);

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Token ${token}`,
  })
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  yourForm: FormGroup;
  profile: Profile[] = [];

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.yourForm = this.fb.group({
      profile: [''],
      file: ['']
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }
  private loadUserProfile() {
    this.profileService.getCurrentUserProfile().subscribe(profile => {
        this.profile = profile;
        console.log(profile);
        
    });
}
uploadDocument(event: any) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      this.yourForm.get('file').setValue(event.target.files[0]);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

onSubmit(): void {
  const uploadData = new FormData();
  uploadData.append('profile', this.yourForm.get('profile').value);
  uploadData.append('image_url', this.yourForm.get('file').value);
  this.http.post('http://127.0.0.1:8000/profile_files/image/', uploadData, httpOptions)
  .subscribe(
    data=>{
console.log(data);

    },
    error=>{
console.log(error);

    }
    );
}
}

