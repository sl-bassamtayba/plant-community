import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlantViewComponent } from './user-plant-view.component';

describe('UserPlantViewComponent', () => {
  let component: UserPlantViewComponent;
  let fixture: ComponentFixture<UserPlantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlantViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
