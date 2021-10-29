import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/models/user';
import { UserPlant } from 'src/models/userPlant';
import { UserPlantService } from 'src/services/user-plant.service';

@Component({
  selector: 'app-user-plant-view',
  templateUrl: './user-plant-view.component.html',
  styleUrls: ['./user-plant-view.component.css'],
})
export class UserPlantViewComponent implements OnInit {
  loggedUser?: User;
  userPlantID?: number;
  userPlant?: UserPlant;
  defaultPicture?: string;
  currentModal?: NgbModalRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private userPlantService: UserPlantService
  ) {}

  ngOnInit(): void {
    this.authenticationService.loggedUser.subscribe((u) => {
      if (u) {
        this.loggedUser = new User(u);
        this.userPlantID = Number(this.route.snapshot.paramMap.get('id'));
        this.getOnePlant();
      }
    });
  }

  getOnePlant() {
    if (this.userPlantID) {
      this.userPlantService.getOne(this.userPlantID).subscribe((res) => {
        this.userPlant = res.UserId === this.loggedUser?.Id ? res : undefined;
        this.defaultPicture = 'assets/images/sample-plant.png';
      });
    }
  }

  updateUserPlant() {
    if (this.userPlant) {
      this.userPlantService.updateUserPlant(this.userPlant).subscribe((res) => {
        this.close();
      });
    }
  }

  deleteUserPlant() {
    if (this.userPlant?.Id) {
      this.userPlantService
        .deleteUserPlant(this.userPlant?.Id)
        .subscribe((res) => {
          this.close();
          this.router.navigate(['/home']);
        });
    }
  }

  // MODAL
  open(content: any, options = {}) {
    this.currentModal = this.modalService.open(content, options);
  }

  close() {
    this.currentModal?.close();
  }

  // EVENT RECEIVER
  closeModalEventReceiver($event: boolean) {
    if ($event === true) {
      this.close();
    }
  }
}
