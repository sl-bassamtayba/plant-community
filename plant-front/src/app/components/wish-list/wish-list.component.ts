import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Plant } from 'src/models/plant';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  loggedUser?: User;
  plants?: (Plant | undefined)[];
  searchValue: string = "";
  principalPictureLocation?: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authenticationService.loggedUser.subscribe((u) => {
      if (u) {
        this.loggedUser = new User(u);
      }
    });

    this.getPlants();
    this.principalPictureLocation = 'assets/images/sample-plant.png';
  }

  getPlants() {
    if (this.loggedUser?.Id) {
      this.userService.getUserWishlist(this.loggedUser?.Id).subscribe((res) => {
        this.plants = res.map((w) => w.Plant).filter((p) => p != undefined);
      });
    }
  }
}
