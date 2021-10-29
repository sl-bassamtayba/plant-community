import {User} from './user';
import {UserPlant} from './userPlant';
import {Plant} from './plant';
import {Question} from './question';
import {Reply} from './reply';
import {Transaction} from './transaction';
import {TransactionProposal} from './transactionProposal';
import {TransactionType} from './transactionType';
import {DeliveryOption} from './deliveryOption';
import {PlantSize} from './plantSize';
import {WishList} from './wishlist';
import {PlantCare} from './plantCare';
import {CareType} from './careType';
import {Frequency} from './frequency';

export interface ResponseJson {

  success?: boolean;
  code?: number;
  message?: string;

  plant?: Plant;
  plants?: Plant[];

  plantCare?: PlantCare;
  plantCares?: PlantCare[];

  careType?: CareType;
  careTypes?: CareType[];

  frequency?: Frequency;
  frequencies?: Frequency[];

  plantSize?: PlantSize;
  plantSizes?: PlantSize[];

  question?: Question;
  questions?: Question[];

  reply?: Reply;
  replies?: Reply[];

  transaction?: Transaction;
  transactions?: Transaction[];

  transactionType?: TransactionType;
  transactionTypes?: TransactionType[];

  deliveryOption?: DeliveryOption;
  deliveryOptions?: DeliveryOption[];

  transactionProposal?: TransactionProposal;
  transactionProposals?: TransactionProposal[];

  user?: User;
  users?: User[];

  userPlant?: UserPlant;
  userPlants?: UserPlant[];

  wishList: WishList;
  wishLists: WishList[];
}

export class Response implements ResponseJson {
  success: boolean;
  code: number;
  message: string;

  plant: Plant;
  plants: Plant[];

  plantCare: PlantCare;
  plantCares: PlantCare[];

  careType: CareType;
  careTypes: CareType[];

  frequency: Frequency;
  frequencies: Frequency[];

  question: Question;
  questions: Question[];

  reply: Reply;
  replies: Reply[];

  transaction: Transaction;
  transactions: Transaction[];

  transactionProposal: TransactionProposal;
  transactionProposals: TransactionProposal[];

  user: User;
  users: User[];

  userPlant: UserPlant;
  userPlants: UserPlant[];

  wishList: WishList;
  wishLists: WishList[];

  deliveryOption: DeliveryOption;
  deliveryOptions: DeliveryOption[];

  transactionType: TransactionType;
  transactionTypes: TransactionType[];

  plantSize: PlantSize;
  plantSizes: PlantSize[];

  constructor(input: ResponseJson) {
    this.success = input.success;
    this.code = input.code;
    this.message = input.message;

    this.plant = input.plant ? new Plant(input.plant) : undefined;
    this.plants = input.plants ? input.plants.map(p => new Plant(p)) : [];

    this.plantCare = input.plantCare ? new PlantCare(input.plantCare) : undefined;
    this.plantCares = input.plantCares ? input.plantCares.map(pc => new PlantCare(pc)) : [];

    this.careType = input.careType ? new CareType(input.careType) : undefined;
    this.careTypes = input.careTypes ? input.careTypes.map(ct => new CareType(ct)) : [];

    this.frequency = input.frequency ? new Frequency(input.frequency) : undefined;
    this.frequencies = input.frequencies ? input.frequencies.map(f => new Frequency(f)) : [];

    this.question = input.question ? new Question(input.question) : undefined;
    this.questions = input.questions ? input.questions.map(q => new Question(q)) : [];

    this.reply = input.reply ? new Reply(input.reply) : undefined;
    this.replies = input.replies ? input.replies.map(r => new Reply(r)) : [];

    this.transaction = input.transaction ? new Transaction(input.transaction) : undefined;
    this.transactions = input.transactions ? input.transactions.map(t => new Transaction(t)) : [];

    this.transactionProposal = input.transactionProposal ? new TransactionProposal(input.transactionProposal) : undefined;
    this.transactionProposals = input.transactionProposals ? input.transactionProposals.map(tp => new TransactionProposal(tp)) : [];

    this.user = input.user ? new User(input.user) : undefined;
    this.users = input.users ? input.users.map(u => new User(u)) : [];

    this.userPlant = input.userPlant ? new UserPlant(input.userPlant) : undefined;
    this.userPlants = input.userPlants ? input.userPlants.map(up => new UserPlant(up)) : [];

    this.wishList = input.wishList ? new WishList(input.wishList) : undefined;
    this.wishLists = input.wishLists ? input.wishLists.map(u => new WishList(u)) : [];

    this.deliveryOption = input.deliveryOption ? new DeliveryOption(input.deliveryOption) : undefined;
    this.deliveryOptions = input.deliveryOptions ? input.deliveryOptions.map(d => new DeliveryOption(d)) : [];

    this.transactionType = input.transactionType ? new TransactionType(input.transactionType) : undefined;
    this.transactionTypes = input.transactionTypes ? input.transactionTypes.map(tt => new TransactionType(tt)) : [];

    this.plantSize = input.plantSize ? new PlantSize(input.plantSize) : undefined;
    this.plantSizes = input.plantSizes ? input.plantSizes.map(p => new PlantSize(p)) : [];

  }

}

