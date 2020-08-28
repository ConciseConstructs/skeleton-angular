import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTagPage } from './edit-tag.page';

describe('EditTagPage', () => {
  let component: EditTagPage;
  let fixture: ComponentFixture<EditTagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTagPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
