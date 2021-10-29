import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/models/plant';
import { Question } from 'src/models/question';
import { Transaction } from 'src/models/transaction';
import { User } from 'src/models/user';
import { UserPlant } from 'src/models/userPlant';
import { PlantService } from 'src/services/plant.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  userId?: number;
  users?: User[];
  user?: User;
  userPlants?: UserPlant[];
  userQuestions?: Question[];
  userTransactions?: Transaction[];
  deleteres?: boolean;

  error?: string;
  plants?: Plant[];
  plant?: Plant;

  constructor(private userService: UserService,
              private plantService: PlantService) { }

  ngOnInit(): void {
    /*this.userId = 1;
    this.getAllUsers();
    this.getOneUser(this.userId);
    this.getUserPlantCares(this.userId);
    this.getUserQuestions(this.userId);
    this.getUserTransactions(this.userId);
    this.deletePlant(11);*/
    this.getAllPlants();
  }

  getAllUsers() {
    this.userService
      .getAll()
      .subscribe(res => {
        this.users = res;
      });
  }

  getOneUser(id: number) {
    this.userService
      .getOne(id)
      .subscribe(res => {
        this.user = res;
      });
  }

  getUserPlants(id: number) {
    this.userService
      .getUserPlant(id)
      .subscribe(res => {
        this.userPlants = res;
      });
  }

  getUserQuestions(id: number) {
    this.userService
      .getUserQuestions(id)
      .subscribe(res => {
        this.userQuestions = res;
      });
  }

  getUserTransactions(id: number) {
    this.userService
      .getUserTransactions(id)
      .subscribe(res => {
        this.userTransactions = res;
      });
  }


  // PLANT

  getAllPlants() {
    this.plantService
      .getAll()
      .subscribe(res => {
        console.log(res);
        this.plants = res;
        this.plants.sort((a, b) => (a.ScientificName > b.ScientificName) ? 1 : ((b.ScientificName > a.ScientificName) ? -1 : 0));
      });
  }



  deletePlant(id: number) {
    this.plantService.deletePlant(id)
      .subscribe(res => {
        this.deleteres = res;
      });
  }

}
