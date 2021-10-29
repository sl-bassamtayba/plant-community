import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlantListComponent } from './user-plant-list.component';

describe('UserPlantListComponent', () => {
  let component: UserPlantListComponent;
  let fixture: ComponentFixture<UserPlantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
