import { Component } from '@angular/core';
import { GenericFormClass } from '../GerericFormClass';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TagsProcessingService } from 'src/app/services/processors/tags-processing/tags.processing.service';
import { Tag } from 'src/assets/models/Tag.model';
import { SiteService } from 'src/app/services/site/site.service';
import { Verify } from '../../../utilities/verifyPropertyExistsIn'
import { ScheduleDetails } from 'src/assets/types/ScheduleDetails.type';


const verify = new Verify()


@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
})
export class QuizFormComponent extends GenericFormClass {

  public tagOptions:Tag[]
  public streak:number
  public scheduled:boolean
  public scheduleOptions
  public isolatedCopy


  constructor(
    public site:SiteService,
    private tagsService:TagsProcessingService,
  ) {
    super()
  }











  protected hookSetModelPost() {
    try { this._hookSetModelPost() }
    catch (error) {
      this.site.events.onError.next({ signature: '959215ac-0218-4d67-8f7d-5ea59c3d27cb', details: error })
    }
  }




      private _hookSetModelPost() {
        this.createScheduleOptions()
        this.tagOptions = this.tagsService.records
        if (!verify.property('this.record.streak').existsIn(this)) this.streak = this.site.settings.preferences.streak
        else this.streak = this.isolatedCopy.streak
        if (this.isolatedCopy.schedule) this.scheduled = (this.isolatedCopy.schedule.value) ? true : false
      }




          public createScheduleOptions() {
            this.scheduleOptions = [
              { name: 'Yes', value: true },
              { name: 'No', value: false },
            ]
          }












  protected createForm() {
    try { this._createForm() }
    catch (error) {
      this.site.events.onError.next({ signature: '95d9cdbb-3c0b-4a11-9727-f8f9654d30a5', details: error })
    }
  }





      private _createForm() {
        this.form = new FormGroup({
          name: new FormControl(this.isolatedCopy.name, { validators: [Validators.required, Validators.minLength(1) ]}),
          questionAmount: new FormControl(this.isolatedCopy.questionAmount, { validators: [Validators.required, Validators.min(1) ]}),
          tags: new FormControl(null),
          streak: new FormControl(this.streak),
          schedule: new FormControl(this.isolatedCopy.schedule),
          scheduled: new FormControl(null)
        })
      }












  protected hookBindRecordToFormPost() {
    try { this._hookBindRecordToFormPost() }
    catch (error) {
      this.site.events.onError.next({ signature: '2c754657-df8f-443d-b441-bb9491de1bce', details: error })
    }
  }




      private _hookBindRecordToFormPost() {
        this.createQuestionsArray()
        this.patchTagsFormValue()
        this.patchScheduledFormValue()
      }




          private createQuestionsArray() {
            this.site.shared['quiz-form-record'].questions = [ ]
            if (this.site.shared['quiz-form-record'].links.questions) this.getAssociatedQuestions()
          }




              private getAssociatedQuestions() {
                Object.keys(this.site.shared['quiz-form-record'].links.questions).forEach(id => {
                  let question = this.site.questions.records.find(question => question.id === id)
                  this.site.shared['quiz-form-record'].questions.push(question)
                })
              }




          private patchTagsFormValue() {
            if (!this.isolatedCopy.tags) return
            let selectedTags = this.tagOptions.filter(option => this.isolatedCopy.tags.includes(option.id))
            this.form.controls.tags.patchValue(selectedTags)
          }




          private patchScheduledFormValue() {
            if (this.isolatedCopy.schedule.rate) {
              this.form.controls.scheduled.patchValue({ name: "Yes", value: true })
              this.scheduled = true
            }
            else this.form.controls.scheduled.patchValue({ name: "No", value: false })
          }












  public onSelectTag(event:CustomEvent) {
    try { this._onSelectTag(event) }
    catch (error) {
      this.site.events.onError.next({ signature: '084733d7-b1d3-4c22-a422-d0510745e50f', details: error })
    }
  }




      private _onSelectTag(event) {
        if (this.site.renderFor === 'mobile') this.isolatedCopy.tags = event.detail.value
      }












  public getSelectedTagState(option) {
    try { return this._getSelectedTagState(option) }
    catch (error) {
      this.site.events.onError.next({ signature: 'bfa7a09d-d61d-4c33-a1cc-8b88d332d62d', details: error })
    }
  }




      private _getSelectedTagState(option) {
        if (!this.isolatedCopy.tags) return
        if (this.isolatedCopy.tags.includes(option.id)) return true
        else return false
      }












  public onBrowseQuestionsButtonClick() {
    try { this._onBrowseQuestionsButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: '8773c2d8-a92a-47cd-994a-3eeb2e5b518a', details: error })
    }
  }




      private _onBrowseQuestionsButtonClick() {
        this.site.router.navigate(['add-questions'])
      }












  public toggleSchedule(event?) {
    try { this._toggleSchedule(event) }
    catch (error) {
      this.site.events.onError.next({ signature: 'edf2ba7f-d6b2-4f43-84fb-793c4823e5d3', details: error })
    }
  }





      private _toggleSchedule(event?) {
        if (event) this.scheduled = this.site.interpreter.componentOutput('dropdown', event)
        else this.scheduled = !this.scheduled
      }












  public onSubmitButtonClick() {
    try { this._onSubmitButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: '8bbbf420-a9af-49fd-af0c-f1060be8bf51', details: error })
    }
  }




      private _onSubmitButtonClick() {
        this.isolatedCopy.name = this.form.value.name
        this.isolatedCopy.streak = this.streak
        this.isolatedCopy.links.tags = { }
        this.isolatedCopy.links.questions = { }
        delete this.isolatedCopy.questions
        if (this.form.value.tags) this.form.value.tags.forEach(tag => this.isolatedCopy.links.tags[tag.id] = null)
        this.site.shared['quiz-form-record'].questions.forEach(id => this.isolatedCopy.links.questions[id] = null)
        this.output.emit(this.isolatedCopy)
      }












  public onScheduleQuiz(event:ScheduleDetails) {
    try { this._onScheduleQuiz(event) }
    catch (error) {
      this.site.events.onError.next({ signature: '2841ef74-a2c1-4d77-a416-f82456460534', details: error })
    }
  }




      private _onScheduleQuiz(event:ScheduleDetails) {
        this.isolatedCopy.schedule = event
      }












  public get numberOfIncludedQuestions():number {
    try { return this._numberOfIncludedQuestions() }
    catch (error) {
      this.site.events.onError.next({ signature: '38bccf99-bdd2-4175-922a-ce2d89598ada', details: error })
    }
  }




      private _numberOfIncludedQuestions():number {
        if (verify.property(`this.site.shared.quiz-form-record.questions`).existsIn(this)) return Object.keys(this.site.shared['quiz-form-record'].questions).length
        else return 0
      }












  public get canSubmit():boolean {
    try { return this._canSubmit() }
    catch (error) {
      this.site.events.onError.next({ signature: '3f00ad73-b330-4a56-a890-d2dc57f683f1', details: error })
    }
  }




      private _canSubmit():boolean {
        if (!this.form.valid) return false
        else if (this.scheduled) {
          if (!this.isolatedCopy.schedule.rate) return false
          else if (!this.isolatedCopy.schedule.unit) return false
          else if (!this.isolatedCopy.schedule.time) return false
          else if (!this.isolatedCopy.schedule.nextQuizUTC) return false
          else return true
        }
        else return true
      }

}
