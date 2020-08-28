import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditQuizPage } from './edit-quiz.page';

describe('EditQuizPage', () => {
  let component: EditQuizPage;
  let fixture: ComponentFixture<EditQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
