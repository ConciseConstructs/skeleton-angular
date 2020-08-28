import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionaireMultipleAnswerComponent } from './questionaire-multiple-answer.component';

describe('QuestionaireMultipleComponent', () => {
  let component: QuestionaireMultipleAnswerComponent;
  let fixture: ComponentFixture<QuestionaireMultipleAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionaireMultipleAnswerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionaireMultipleAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
