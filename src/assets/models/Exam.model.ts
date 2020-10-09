import { GenericModel } from '../classes/GenericModel.class';
import { Quiz } from 'src/assets/models/Quiz.model';
import { Question } from 'src/assets/models/Question.model';


export class Exam extends GenericModel {

  public quiz:Quiz
  public results:{ question:Question, answer:string|boolean, correct:boolean }[]


  constructor(params:{ quiz:Quiz }) {
    super(params)
  }












  protected hookConstructorPost() {
    this._item.modelName = 'exam'
    this._item.modelNamePlural = 'exams'
    this.results = []
  }

}
