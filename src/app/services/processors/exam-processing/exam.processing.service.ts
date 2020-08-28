import { Injectable } from '@angular/core';
import { Exam } from 'src/assets/models/Exam.model';
import { Question } from 'src/assets/models/Question.model';
import { Quiz } from 'src/assets/models/Quiz.model';
import { QuestionsProcessingService } from '../questions-processing/questions.processing.service';
import { TagsProcessingService } from '../tags-processing/tags.processing.service';
import { SettingsService } from '../../site/settings/settings.service';
import { copyOf } from 'src/assets/utilities/copyOf';
import { SessionService } from '../../site/session/session.service';
import { EventsService } from '../../site/events/events.service';


@Injectable({
  providedIn: 'root'
})
export class ExamProcessingService {

  public index:number
  public exam:Exam
  public bucketOdds:{ b:number, c:number }
  public questions:Question[]
  private questionsByUniqueIdsPool:{ [key:string]:null }
  private queuedQuestionsByUniqueIds:{ [key:string]:null }
  private AQuestions:Question[]
  private BQuestions:Question[]
  private CQuestions:Question[]


  constructor(
    private events:EventsService,
    private questionsService:QuestionsProcessingService,
    private tagsService:TagsProcessingService,
    private settings:SettingsService,
  ) {
    this.resetSettings()
  }












  public resetSettings() {
    try { this._resetSettings() }
    catch (error) {
      this.events.onError.next({ signature: '69ade095-89d8-4ed0-9d0d-cf5e3298dd19', details: error })
    }
  }




      private _resetSettings() {
        this.index = 0
        this.bucketOdds = { b: .20, c: .10 }
        this.questions = [ ]
        this.questionsByUniqueIdsPool = { }
        this.queuedQuestionsByUniqueIds = { }
      }












  public loadExam(quiz:Quiz) {
    try { this._loadExam(quiz) }
    catch (error) {
      this.events.onError.next({ signature: '940d36c6-a0de-4f10-9387-fe61f3aedc4c', details: error })
    }
  }




      private _loadExam(quiz) {
        this.exam = new Exam({ quiz: quiz })
        this.loadQuestions()
      }




          private loadQuestions() {
            this.resetSettings()
            this.populateMasterPoolOfQuestions()
            this.filterQuestionsIntoFrequencyBuckets()
            if (this.doesntHaveEnoughQuestionsToFullfilRequirements) this.addAllAvailableQuestions()
            else while (this.needsToPopulateRandomQuestions) this.populateRandomQuestion()
            Object.values(this.queuedQuestionsByUniqueIds).forEach(question => this.questions.push(new Question(question)))
          }




              private populateMasterPoolOfQuestions() {
                if (this.exam.quiz.tags) this.exam.quiz.tags.forEach(tagId => this.addAssociatedQuestionsToPool(tagId))
                if (this.exam.quiz.links.questions) Object.keys(this.exam.quiz.links.questions).forEach(questionId => this.addQuestionToPool(questionId))
              }




                  private addAssociatedQuestionsToPool(tagId) {
                    let tag = this.tagsService.records.find(tag => tag.id === tagId)
                    if (!tag.links.questions) return
                    else Object.keys(tag.links.questions).forEach(questionId => {
                      let question = this.questionsService.records.find(question => question.id === questionId)
                      this.questionsByUniqueIdsPool[question.id] = question
                    })
                  }




                  private addQuestionToPool(questionId) {
                    let question = this.questionsService.records.find(question => question.id === questionId)
                    this.questionsByUniqueIdsPool[questionId] = question
                  }




              private filterQuestionsIntoFrequencyBuckets() {
                this.filterOutNoLongerExistingQuestionsById()
                this.AQuestions = Object.values(this.questionsByUniqueIdsPool).filter(question => (question as any).bucket === 'a')
                this.BQuestions = Object.values(this.questionsByUniqueIdsPool).filter(question => (question as any).bucket === 'b')
                this.CQuestions = Object.values(this.questionsByUniqueIdsPool).filter(question => (question as any).bucket === 'c')
              }




                  private filterOutNoLongerExistingQuestionsById() {
                    for (let [ questionId, question ] of Object.entries(this.questionsByUniqueIdsPool))
                      if (!question) delete this.questionsByUniqueIdsPool[questionId]
                  }




              private get doesntHaveEnoughQuestionsToFullfilRequirements() {
                return (this.questionsService.records.length < this.exam.quiz.questionAmount)
              }




              private addAllAvailableQuestions() {
                
                this.AQuestions.forEach(aQuestion => this.queuedQuestionsByUniqueIds[aQuestion.id] = this.questionsService.records.find(question => question.id === aQuestion.id))
                this.BQuestions.forEach(bQuestion => this.queuedQuestionsByUniqueIds[bQuestion.id] = this.questionsService.records.find(question => question.id === bQuestion.id))
                this.CQuestions.forEach(cQuestion => this.queuedQuestionsByUniqueIds[cQuestion.id] = this.questionsService.records.find(question => question.id === cQuestion.id))
                // Object.keys(this.exam.quiz.links.questions).forEach(questionId => this.questions.push(this.questionsService.records.find(question => question.id === questionId)))
              }




              private get needsToPopulateRandomQuestions() {
                return (Object.keys(this.queuedQuestionsByUniqueIds).length < this.exam.quiz.questionAmount)
              }




              private populateRandomQuestion() {
                let randomQuestion = this.selectRandomQuestionFromBucketOdds()
                if (!randomQuestion) return
                else this.queuedQuestionsByUniqueIds[randomQuestion.id] = randomQuestion
              }




                  private selectRandomQuestionFromBucketOdds() {
                    let randomQuestion, randomBucketNumber = Math.random()
                    if (randomBucketNumber <= this.bucketOdds.c) randomQuestion = this.randomSelectIndex(this.CQuestions)
                    else if (randomBucketNumber <= this.bucketOdds.b) randomQuestion = this.randomSelectIndex(this.BQuestions)
                    else randomQuestion = this.randomSelectIndex(this.AQuestions)
                    return randomQuestion
                  }




                  private randomSelectIndex(array) {
                    let randomIndex = Math.floor(Math.random() * array.length)
                    let record = array[randomIndex]
                    delete array[randomIndex]
                    return record
                  }













  public beginReviewMode() {
    try { this._beginReviewMode() }
    catch (error) {
      this.events.onError.next({ signature: 'b6538d2b-48ed-493c-b71e-a5d86be47681', details: error })
    }
  }




      private _beginReviewMode() {
        this.index = 0
      }












  public processAnswersForNextTime() {
    try { this._processAnswersForNextTime() }
    catch (error) {
      this.events.onError.next({ signature: '4fd6b93c-2eb5-4a77-84be-82db4c75afa4', details: error })
    }
  }




      private _processAnswersForNextTime() {
        this.questions.forEach(question => this.processAnswer(question))
      }




          private processAnswer(question) {
            let copy = copyOf(question)
            if (!copy.correct) copy = this.processIncorrectAnswer(copy)
            if (copy.correct) copy = this.processCorrectAnswer(copy)
            if (copy.streak > this.exam.quiz.streak) copy = this.processIntoNewBuckets(copy)
            delete copy.userAnswer
            delete copy.correct
            this.questionsService.update(copy)
          }




              private processIncorrectAnswer(copy) {
                copy.bucket = 'a'
                copy.streak = 0
                return copy
              }




              private processCorrectAnswer(copy) {
                copy.streak++
                return copy
              }




              private processIntoNewBuckets(copy) {
                copy.streak = 0
                if (copy.bucket === 'a') copy.bucket = 'b'
                else if (copy.bucket === 'b') copy.bucket = 'c'
                return copy
              }

}
