import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormEstimateComponent } from './form-estimate.component';

describe('FormEstimateComponent', () => {
  let component: FormEstimateComponent;
  let fixture: ComponentFixture<FormEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEstimateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
