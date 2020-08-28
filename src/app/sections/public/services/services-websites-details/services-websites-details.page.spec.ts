import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicesWebsitesDetailsPage } from './services-websites-details.page';

describe('ServicesWebsitesDetailsPage', () => {
  let component: ServicesWebsitesDetailsPage;
  let fixture: ComponentFixture<ServicesWebsitesDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesWebsitesDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesWebsitesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
