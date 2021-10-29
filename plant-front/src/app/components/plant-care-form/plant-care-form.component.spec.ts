import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCareFormComponent } from './plant-care-form.component';

describe('PlantCareFormComponent', () => {
  let component: PlantCareFormComponent;
  let fixture: ComponentFixture<PlantCareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantCareFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantCareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
