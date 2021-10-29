import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Transaction } from 'src/models/transaction';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  loggedUser?: User;
  openedTransactions?: Transaction[];
  closedTransactions?: Transaction[];
  modal?: NgbModalRef;

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService
      .loggedUser
      .subscribe(u => {
        if (u) {
          this.loggedUser = new User(u);
        }
      });

    this.getTransactions();
  }

  getTransactions() {
    if(this.loggedUser?.Id) {
      this.userService.getUserTransactions(this.loggedUser.Id)
      .subscribe(res => {
        this.openedTransactions = res.filter(t => t.IsClosed === false);
        this.closedTransactions = res.filter(t => t.IsClosed === true);
      });
    }

  }

  // MODAL
  open(content: any) {
    this.modal = this.modalService.open(content, {size: 'xl'});
  }

  close() {
    this.modal?.close();
  }



}
