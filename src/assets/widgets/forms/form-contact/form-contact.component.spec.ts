import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormContactComponent } from './form-contact.component';

describe('FormContactComponent', () => {
  let component: FormContactComponent;
  let fixture: ComponentFixture<FormContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContactComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
