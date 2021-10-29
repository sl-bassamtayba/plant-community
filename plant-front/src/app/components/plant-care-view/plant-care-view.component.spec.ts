import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCareViewComponent } from './plant-care-view.component';

describe('PlantCareViewComponent', () => {
  let component: PlantCareViewComponent;
  let fixture: ComponentFixture<PlantCareViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantCareViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantCareViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
