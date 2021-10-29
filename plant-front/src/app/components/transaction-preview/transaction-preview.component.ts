import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Transaction } from 'src/models/transaction';
import { User } from 'src/models/user';

@Component({
  selector: 'app-transaction-preview',
  templateUrl: './transaction-preview.component.html',
  styleUrls: ['./transaction-preview.component.css']
})
export class TransactionPreviewComponent implements OnInit {

  @Input() transaction?: Transaction;
  principalPictureLocation?: string;
  loggedUser?: User;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService
      .loggedUser
      .subscribe(u => {
        if (u) {
          this.loggedUser = new User(u);
        }
      });

    this.getPrincipalPicture();
  }

  getPrincipalPicture() {
    // TODO : refactor photos
    this.principalPictureLocation = 'assets/images/sample-plant.png';
  }

}
