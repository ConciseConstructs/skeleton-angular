import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicyPrivacyViewComponent } from './policy-privacy-view.component';

describe('PolicyPrivacyViewComponent', () => {
  let component: PolicyPrivacyViewComponent;
  let fixture: ComponentFixture<PolicyPrivacyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPrivacyViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyPrivacyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
