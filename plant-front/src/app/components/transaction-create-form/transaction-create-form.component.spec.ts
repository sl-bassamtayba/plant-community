import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreateFormComponent } from './transaction-create-form.component';

describe('TransactionCreateFormComponent', () => {
  let component: TransactionCreateFormComponent;
  let fixture: ComponentFixture<TransactionCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
