import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Plant } from 'src/models/plant';
import { Transaction } from 'src/models/transaction';
import { User } from 'src/models/user';
import { UserPlant } from 'src/models/userPlant';
import { WishList } from 'src/models/wishlist';
import { PlantService } from 'src/services/plant.service';
import { UserPlantService } from 'src/services/user-plant.service';
import { WishListService } from 'src/services/wish-list.service';

@Component({
  selector: 'app-plant-view',
  templateUrl: './plant-view.component.html',
  styleUrls: ['./plant-view.component.css'],
})
export class PlantViewComponent implements OnInit {
  loggedUser?: User;

  plantID?: number;
  plant?: Plant;
  principalPictureLocation?: string;
  transactions?: Transaction[];
  isInWishList?: boolean;
  wishListElementId?: number;
  isUserPlant?: boolean;
  userPlantElementId?: number;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private wishlistService: WishListService,
    private userPlantService: UserPlantService,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.plantID = Number(this.route.snapshot.paramMap.get('Id'));
    this.getOnePlant();
    this.getPrincipalPicture();

    this.authenticationService.loggedUser.subscribe((u) => {
      if (u) {
        this.loggedUser = new User(u);
        this.checkWishList();
        this.checkUserPlant();
        this.getTransactions();
      }
    });
  }

  getOnePlant() {
    if (this.plantID) {
      this.plantService.getOne(this.plantID).subscribe((res) => {
        this.plant = res;
      });
    }
  }

  getPrincipalPicture() {
    // TODO : refactor photos
    this.principalPictureLocation = 'assets/images/sample-plant.png';
  }

  getPictures() {
    // TODO : récupération de la galerie photos des plantes
  }

  getPlantCare() {
    // TODO: calculer l'entretien moyen d'après l'entretien des utiliateurs ?
  }

  getAdvices() {
    // TODO: créer une section "Conseils" pour chaque plante
  }

  checkWishList() {
    if (this.loggedUser?.Id && this.plantID) {
      this.wishlistService
        .findWishListElement(this.loggedUser.Id, this.plantID)
        .subscribe((res) => {
          this.isInWishList = !!res.Id;
          this.wishListElementId = res.Id;
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

  getTransactions() {
    if (this.loggedUser?.Id && this.plantID) {
      this.plantService.getPlantTransactions(this.plantID).subscribe((res) => {
        this.transactions = res
          ? res.filter((t) => t.Seller?.Id !== this.loggedUser?.Id)
          : [];
      });
    }
  }

  checkUserPlant() {
    if (this.loggedUser?.Id && this.plantID) {
      this.userPlantService
        .findElement(this.loggedUser.Id, this.plantID)
        .subscribe((res) => {
          this.isUserPlant = !!res.Id;
          this.userPlantElementId = res.Id;
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
