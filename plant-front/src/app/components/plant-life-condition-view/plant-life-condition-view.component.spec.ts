import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantLifeConditionViewComponent } from './plant-life-condition-view.component';

describe('PlantLifeConditionViewComponent', () => {
  let component: PlantLifeConditionViewComponent;
  let fixture: ComponentFixture<PlantLifeConditionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantLifeConditionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantLifeConditionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
