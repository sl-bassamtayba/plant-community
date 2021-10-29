import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionProposalCreateFormComponent } from './transaction-proposal-create-form.component';

describe('TransactionProposalCreateFormComponent', () => {
  let component: TransactionProposalCreateFormComponent;
  let fixture: ComponentFixture<TransactionProposalCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionProposalCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionProposalCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
