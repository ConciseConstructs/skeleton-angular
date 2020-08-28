import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaptchaGoogleComponent } from './captcha-google.component';

describe('CaptchaGoogleComponent', () => {
  let component: CaptchaGoogleComponent;
  let fixture: ComponentFixture<CaptchaGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaGoogleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaptchaGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
