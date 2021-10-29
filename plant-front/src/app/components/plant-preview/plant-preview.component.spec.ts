import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantPreviewComponent } from './plant-preview.component';

describe('PlantPreviewComponent', () => {
  let component: PlantPreviewComponent;
  let fixture: ComponentFixture<PlantPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
