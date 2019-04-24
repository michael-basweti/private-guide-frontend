import { Component, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profile: Profile[] = [];

  constructor(
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }
  private loadUserProfile() {
    this.profileService.getCurrentUserProfile().subscribe(profile => {
        this.profile = profile;
        console.log(profile);
        
    });
}
}
