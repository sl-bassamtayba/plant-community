import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Plant } from 'src/models/plant';
import { Transaction } from 'src/models/transaction';
import { TransactionProposal } from 'src/models/transactionProposal';
import { User } from 'src/models/user';
import { WishList } from 'src/models/wishlist';
import { TransactionService } from 'src/services/transaction.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css'],
})
export class TransactionViewComponent implements OnInit {
  loggedUser?: User;

  transactionID?: number;
  transaction?: Transaction;
  proposals?: TransactionProposal[];
  sellerPlantWishlist?: (Plant | undefined)[];

  defaultPicture?: string;

  modal?: NgbModalRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private transactionService: TransactionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authenticationService.loggedUser.subscribe((u) => {
      if (u) {
        this.loggedUser = new User(u);
      }
    });

    this.transactionID = Number(this.route.snapshot.paramMap.get('id'));
    this.getOneTransaction();
  }

  getOneTransaction() {
    if (this.transactionID) {
      this.transactionService.getOne(this.transactionID).subscribe((res) => {
        this.transaction = res;
        this.getTransactionProposals();
        this.getDefaultPicture();
        this.getSellerWishlist();
      });
    }
  }

  getTransactionProposals() {
    if (this.transactionID) {
      this.transactionService
        .getTransactionProposals(this.transactionID)
        .subscribe((res) => {
          this.proposals = res;
        });
    }
  }

  getSellerWishlist() {
    const id = this.transaction?.Seller?.Id || this.transaction?.SellerId;
    if (id) {
      this.userService
        .getUserWishlist(id)
        .subscribe((res: WishList[]) => {
          this.sellerPlantWishlist = res.map(wishlist => wishlist.Plant).filter(p => p != undefined);
        });
    }
  }

  isTransactionIsExchange(): boolean {
    if(this.transaction) {
      for (const tt of this.transaction?.TransactionTypes) {
        if (tt.EnglishLabel.includes('Exchange')) {
          return true;
        }
      }
    }
    return false;

  }

  deleteTransaction() {
    if(this.transactionID) {
      this.transactionService
      .deleteTransaction(this.transactionID)
      .subscribe((res) => {
        this.close();
        this.router.navigate(['/home']);
      });
    }
  }

  // MODAL
  open(content: any, options = {}) {
    this.modal = this.modalService.open(content, options);
  }

  close() {
    this.modal?.close();
  }

  // EVENT RECEIVER
  closeModalEventReceiver($event: boolean) {
    if ($event === true) {
      this.close();
      this.getTransactionProposals();
    }
  }

  proposalEventReceiver($event: boolean) {
    if ($event === true) {
      this.getTransactionProposals();
    }
  }

  private getDefaultPicture() {
    this.defaultPicture = 'assets/images/sample-plant.png';
  }
}
