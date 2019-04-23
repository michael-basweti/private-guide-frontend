import { Component, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { first } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles: Profile[] = [];

  constructor(
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.loadAllProfiles();
  }
  private loadAllProfiles() {
    this.profileService.getProfiles().subscribe(profiles => {
        this.profiles = profiles;
        console.log(profiles);
        
    });
}

}
