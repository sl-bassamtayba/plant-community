import { environment } from "./environments/environment";

export class Constants {

  public static baseURl = environment.host;
  public static careTypeServiceUrl = 'careTypes/';
  public static deliveryOptionServiceUrl = 'deliveryOptions/';
  public static frequencyServiceUrl = 'frequencies/';
  public static plantCareServiceUrl = 'plantCares/';
  public static plantSizeServiceUrl = 'plantSizes/';
  public static plantServiceUrl = 'plants/';
  public static transactionTypeServiceUrl = 'transactionTypes/';
  public static userServiceUrl = 'users/';
  public static wishlistServiceUrl = 'wishLists/';
  public static questionServiceUrl = 'questions/';
  public static transactionProposalServiceUrl = 'transactionProposals/';
  public static transactionServiceUrl = 'transactions/';
  public static userPlantServiceUrl = 'userPlants/';

}
