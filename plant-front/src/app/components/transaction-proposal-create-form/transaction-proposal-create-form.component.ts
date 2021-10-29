import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Transaction } from 'src/models/transaction';
import { TransactionProposal } from 'src/models/transactionProposal';
import { User } from 'src/models/user';
import { TransactionProposalService } from 'src/services/transaction-proposal.service';

@Component({
  selector: 'app-transaction-proposal-create-form',
  templateUrl: './transaction-proposal-create-form.component.html',
  styleUrls: ['./transaction-proposal-create-form.component.css']
})
export class TransactionProposalCreateFormComponent implements OnInit {

  @Input() transaction?: Transaction;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  loggedUser?: User;
  newProposal?: TransactionProposal;

  constructor(private transactionProposalService: TransactionProposalService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService
      .loggedUser
      .subscribe(u => {
        if (u) {
          this.loggedUser = new User(u);
        }
      });

      this.createProposal();
  }

  sendForm() {

    if(this.newProposal) {
      this.newProposal.Date = new Date(Date.now());

      this.transactionProposalService.createTransactionProposal(this.newProposal)
        .subscribe(res => {
          this.newProposal = res;
          this.closeModalEvent.emit(true);
        });
    }
    else {
      this.createProposal();
    }

  }

  private createProposal() {
    if (this.loggedUser?.Id && this.transaction?.Id) {
      this.newProposal = new TransactionProposal({
        userId: this.loggedUser.Id,
        transactionId: this.transaction.Id
      });
    }
  }

}
