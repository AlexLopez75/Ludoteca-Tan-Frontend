import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoanListComponent } from './loan-list.page';

describe('LoanListPage', () => {
  let component: LoanListComponent;
  let fixture: ComponentFixture<LoanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
