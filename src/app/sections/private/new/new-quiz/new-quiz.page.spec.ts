import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewQuizPage } from './new-quiz.page';

describe('NewQuizPage', () => {
  let component: NewQuizPage;
  let fixture: ComponentFixture<NewQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
