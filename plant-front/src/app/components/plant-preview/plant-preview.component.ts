import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Plant } from 'src/models/plant';
import { User } from 'src/models/user';
import { UserPlant } from 'src/models/userPlant';
import { WishList } from 'src/models/wishlist';
import { UserPlantService } from 'src/services/user-plant.service';
import { WishListService } from 'src/services/wish-list.service';

@Component({
  selector: 'app-plant-preview',
  templateUrl: './plant-preview.component.html',
  styleUrls: ['./plant-preview.component.css'],
})
export class PlantPreviewComponent implements OnInit {
  // TODO : ajouter les photos

  @Input() plant?: Plant;
  principalPictureLocation?: string;
  loggedUser?: User;
  isInWishList?: boolean;
  wishListElementId?: number;

  isUserPlant?: boolean;
  userPlantElementId?: number;

  constructor(
    private authenticationService: AuthenticationService,
    private userPlantService: UserPlantService,
    private wishlistService: WishListService
  ) {}

  ngOnInit(): void {
    this.authenticationService.loggedUser.subscribe((u) => {
      if (u) {
        this.loggedUser = new User(u);
        this.checkWishList();
        this.checkUserPlant();
      }
    });

    this.getPrincipalPicture();
  }

  getPrincipalPicture() {
    // TODO : refactor photos
    this.principalPictureLocation = 'assets/images/sample-plant.png';
  }

  checkWishList() {
    if (this.loggedUser?.Id && this.plant?.Id) {
      this.wishlistService
        .findWishListElement(this.loggedUser.Id, this.plant.Id)
        .subscribe((res) => {
          this.isInWishList = !!res.Id;
          this.wishListElementId = res.Id;
        });
    }
  }

  checkUserPlant() {
    if (this.loggedUser?.Id && this.plant?.Id) {
      this.userPlantService
        .findElement(this.loggedUser.Id, this.plant.Id)
        .subscribe((res) => {
          this.isUserPlant = !!res.Id;
          this.userPlantElementId = res.Id;
        });
    }
  }

  addToWishlist() {
    if (this.loggedUser?.Id && this.plant?.Id) {
      this.wishlistService
        .createWishList(
          new WishList({
            userId: this.loggedUser.Id,
            plantId: this.plant.Id,
          })
        )
        .subscribe((res) => {
          this.isInWishList = true;
          this.wishListElementId = res.Id;
        });
    }
  }

  deleteFromWishlist() {
    if (this.wishListElementId) {
      this.wishlistService
        .deleteWishList(this.wishListElementId)
        .subscribe((res) => {
          this.isInWishList = false;
          this.wishListElementId = undefined;
        });
    }
  }

  createGenericUserPlant() {
    if (this.loggedUser?.Id && this.plant?.Id) {
      const userPlant = new UserPlant({
        userId: this.loggedUser.Id,
        plantId: this.plant.Id,
        nickname: this.plant.ScientificName + 'NoName',
      });
      this.userPlantService.createUserPlant(userPlant).subscribe((res) => {
        this.isUserPlant = true;
        this.userPlantElementId = res.Id;
        if (this.userPlantElementId === this.wishListElementId) {
          this.deleteFromWishlist();
        }
      });
    }
  }
}
