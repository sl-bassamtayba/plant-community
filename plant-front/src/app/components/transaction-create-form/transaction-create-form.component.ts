import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoggerService } from 'src/app/core/services/logger.service';
import { DeliveryOption } from 'src/models/deliveryOption';
import { Plant } from 'src/models/plant';
import { PlantSize } from 'src/models/plantSize';
import { Transaction } from 'src/models/transaction';
import { TransactionType } from 'src/models/transactionType';
import { User } from 'src/models/user';
import { UserPlant } from 'src/models/userPlant';
import { DeliveryOptionService } from 'src/services/delivery-option.service';
import { PlantSizeService } from 'src/services/plant-size.service';
import { PlantService } from 'src/services/plant.service';
import { TransactionTypeService } from 'src/services/transaction-type.service';
import { TransactionService } from 'src/services/transaction.service';

@Component({
  selector: 'app-transaction-create-form',
  templateUrl: './transaction-create-form.component.html',
  styleUrls: ['./transaction-create-form.component.css']
})
export class TransactionCreateFormComponent implements OnInit {

  // TODO: Corriger DeliveryOptions & TransactionTypes

  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Input() userPlant?: UserPlant;

  loggedUser?: User;
  transaction?: Transaction;

  plantsValues?: Plant[];
  plantSizesValues?: PlantSize[];
  transactionTypesValues?: TransactionType[];
  deliveryOptionsValues?: DeliveryOption[];

  selectedTransactionTypes: TransactionType[] = [];
  selectedDeliveryOptions: DeliveryOption[] = [];

  constructor(private authenticationService:AuthenticationService,
              private deliveryOptionService: DeliveryOptionService,
              private transactionTypeService: TransactionTypeService,
              private plantService: PlantService,
              private plantSizeService: PlantSizeService,
              private transactionService: TransactionService,
              private loggerService: LoggerService) {
  }

  ngOnInit(): void {
    this.authenticationService
      .loggedUser
      .subscribe(u => {
        if (u) {
          this.loggedUser = new User(u);
        }
      });

    this.getValues();

    this.newTransaction();
  }

  sendForm() {
    if(this.transaction) {
      this.transaction.Start = new Date(Date.now());
      this.transaction.DeliveryOptions = this.selectedDeliveryOptions;
      this.transaction.TransactionTypes = this.selectedTransactionTypes;

      this.transactionService
      .createTransaction(this.transaction)
      .subscribe(res => {
        this.closeModalEvent.emit(true);
      });
    } else {
      this.newTransaction();
      this.sendForm();
    }
  }

  private newTransaction() {
    if (this.loggedUser?.Id && this.userPlant?.Plant?.Id) {
      this.transaction = new Transaction({
        sellerId: this.loggedUser.Id,
        plantId: this.userPlant.Plant.Id,
      });
    }
  }

  getValues() {
    this.deliveryOptionService
      .getAll()
      .subscribe(res => {
        this.deliveryOptionsValues = res;
      });

    this.transactionTypeService
      .getAll()
      .subscribe(res => {
        this.transactionTypesValues = res;
      });

    this.plantSizeService
      .getAll()
      .subscribe(res => {
        this.plantSizesValues = res;
      });

    this.plantService
      .getAll()
      .subscribe(res => {
        this.plantsValues = res;
        // TODO: filter by loggedUser
      });

  }

}
