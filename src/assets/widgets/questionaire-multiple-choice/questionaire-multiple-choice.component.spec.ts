import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionaireMultipleChoiceComponent } from './questionaire-multiple-choice.component';

describe('QuestionaireMultipleChoiceComponent', () => {
  let component: QuestionaireMultipleChoiceComponent;
  let fixture: ComponentFixture<QuestionaireMultipleChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionaireMultipleChoiceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionaireMultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
