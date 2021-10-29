import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionProposalViewComponent } from './transaction-proposal-view.component';

describe('TransactionProposalViewComponent', () => {
  let component: TransactionProposalViewComponent;
  let fixture: ComponentFixture<TransactionProposalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionProposalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionProposalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
