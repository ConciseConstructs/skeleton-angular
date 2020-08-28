import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BooleanPage } from './boolean.page';

describe('BooleanPage', () => {
  let component: BooleanPage;
  let fixture: ComponentFixture<BooleanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BooleanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
