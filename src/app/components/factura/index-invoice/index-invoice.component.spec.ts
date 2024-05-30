import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexInvoiceComponent } from './index-invoice.component';

describe('IndexInvoiceComponent', () => {
  let component: IndexInvoiceComponent;
  let fixture: ComponentFixture<IndexInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
