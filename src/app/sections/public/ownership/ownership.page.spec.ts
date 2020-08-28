import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OwnershipPage } from './ownership.page';

describe('OwnershipPage', () => {
  let component: OwnershipPage;
  let fixture: ComponentFixture<OwnershipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnershipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnershipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
