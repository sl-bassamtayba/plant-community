import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/models/user';
import { UserPlant } from 'src/models/userPlant';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-plant-list',
  templateUrl: './user-plant-list.component.html',
  styleUrls: ['./user-plant-list.component.css']
})
export class UserPlantListComponent implements OnInit {

  loggedUser?: User;
  userPlants?: UserPlant[];

  searchValue?: string;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.authenticationService
      .loggedUser
      .subscribe(u => {
        if (u) {
          this.loggedUser = new User(u);
          this.getPlants();
        }
      });
  }

  getPlants() {
    if(this.loggedUser?.Id) {
      this.userService.getUserPlant(this.loggedUser?.Id)
        .subscribe(res => {
          this.userPlants = res;
        });
    }
  }

}
