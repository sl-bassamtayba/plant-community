import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionProposal } from 'src/models/transactionProposal';
import { TransactionProposalService } from 'src/services/transaction-proposal.service';

@Component({
  selector: 'app-transaction-proposal-view',
  templateUrl: './transaction-proposal-view.component.html',
  styleUrls: ['./transaction-proposal-view.component.css'],
})
export class TransactionProposalViewComponent implements OnInit {
  @Input() proposal?: TransactionProposal;
  @Output() ProposalEvent = new EventEmitter<boolean>();

  constructor(private transactionProposalService: TransactionProposalService) {}

  ngOnInit(): void {}

  acceptProposal() {
    if (this.proposal) {
      this.proposal.Validation = true;
      this.transactionProposalService
        .acceptTransactionProposal(this.proposal)
        .subscribe((res) => {
          this.ProposalEvent.emit(true);
        });
    }
  }

  refuseProposal() {
    if (this.proposal) {
      this.proposal.Validation = false;
      this.transactionProposalService
        .refuseTransactionProposal(this.proposal)
        .subscribe((res) => {
          this.ProposalEvent.emit(true);
        });
    }
  }

  cancelProposal() {
    if (this.proposal) {
      this.proposal.Validation = undefined;
      this.transactionProposalService
        .cancelTransactionProposal(this.proposal)
        .subscribe((res) => {
          this.ProposalEvent.emit(true);
        });
    }
  }
}
