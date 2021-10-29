import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Credentials } from 'src/models/credentials';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public loggedUser?: User;
  private currentModal?: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.loggedUser.subscribe((u) => {
      if (u) {
        this.loggedUser = new User(u);
      }
    });
  }

  login() {
    this.authenticationService
      .localLogin(new Credentials('', ''))
      .subscribe((user) => {
        this.loggedUser = user;
        this.close();
      });
  }

  logout() {
    if (this.loggedUser) {
      this.authenticationService.logout(this.loggedUser);
    }
    this.loggedUser = undefined;
  }

  register() {
    // TODO : user register
  }

  // MODAL
  open(content: any, options = {}) {
    this.currentModal = this.modalService.open(content, options);
  }

  close() {
    if (this.currentModal) {
      this.currentModal.close();
    }
  }
}
