import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorIntercept } from './core/error.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DemoComponent } from './components/demo/demo.component';
import { PlantPreviewComponent } from './components/plant-preview/plant-preview.component';
import { PlantsFilterPipe } from 'src/pipes/plants-filter.pipe';
import { SimpleGenericFilterPipe } from 'src/pipes/simple-generic-filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { PlantCareFormComponent } from './components/plant-care-form/plant-care-form.component';
import { PlantCareViewComponent } from './components/plant-care-view/plant-care-view.component';
import { PlantLifeConditionViewComponent } from './components/plant-life-condition-view/plant-life-condition-view.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PlantViewComponent } from './components/plant-view/plant-view.component';
import { TransactionCreateFormComponent } from './components/transaction-create-form/transaction-create-form.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionPreviewComponent } from './components/transaction-preview/transaction-preview.component';
import { TransactionProposalCreateFormComponent } from './components/transaction-proposal-create-form/transaction-proposal-create-form.component';
import { TransactionProposalViewComponent } from './components/transaction-proposal-view/transaction-proposal-view.component';
import { TransactionViewComponent } from './components/transaction-view/transaction-view.component';
import { UserPlantListComponent } from './components/user-plant-list/user-plant-list.component';
import { UserPlantPreviewComponent } from './components/user-plant-preview/user-plant-preview.component';
import { UserPlantViewComponent } from './components/user-plant-view/user-plant-view.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faHandshake, faTrashAlt, faSun, faComment, faEye } from '@fortawesome/free-regular-svg-icons';
import { faHeartBroken, faThermometerFull, faThermometerHalf, faThermometerEmpty, faExchangeAlt, faGift, faEuroSign, faPlus, faPen, faStoreAlt, faHome, faTint, faMapMarker, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DemoComponent,
    PlantPreviewComponent,
    PlantViewComponent,
    FooterComponent,
    TransactionPreviewComponent,
    TransactionViewComponent,
    TransactionProposalViewComponent,
    TransactionProposalCreateFormComponent,
    TransactionCreateFormComponent,
    PlantListComponent,
    SimpleGenericFilterPipe,
    PlantsFilterPipe,
    TransactionListComponent,
    WishListComponent,
    PlantCareViewComponent,
    UserPlantViewComponent,
    UserPlantListComponent,
    UserPlantPreviewComponent,
    PlantCareFormComponent,
    PlantLifeConditionViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faHeart, faHeartBroken,
      faThermometerFull, faThermometerHalf, faThermometerEmpty,
      faExchangeAlt, faGift, faEuroSign, faPlus, faPen,
      faStoreAlt, faHome, faHandshake, faTrashAlt,
      faSun, faTint, faMapMarker, faComment, faEye,
      faFacebook, faTwitter, faInstagram, faSignOutAlt, faSignInAlt);
  }
 }
