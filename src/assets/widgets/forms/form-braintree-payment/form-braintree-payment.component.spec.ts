import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormBraintreePaymentComponent } from './form-braintree-payment.component';

describe('FormBraintreePaymentComponent', () => {
  let component: FormBraintreePaymentComponent;
  let fixture: ComponentFixture<FormBraintreePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBraintreePaymentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormBraintreePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
