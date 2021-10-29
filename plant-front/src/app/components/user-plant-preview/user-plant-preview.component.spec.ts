import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlantPreviewComponent } from './user-plant-preview.component';

describe('UserPlantPreviewComponent', () => {
  let component: UserPlantPreviewComponent;
  let fixture: ComponentFixture<UserPlantPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPlantPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlantPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
