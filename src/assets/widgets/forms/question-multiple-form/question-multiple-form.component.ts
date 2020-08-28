import { Component, OnInit, Input } from '@angular/core';
import { GenericFormClass } from '../GerericFormClass';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TagsProcessingService } from 'src/app/services/processors/tags-processing/tags.processing.service';
import { Verify } from '../../../utilities/verifyPropertyExistsIn'
import { SiteService } from 'src/app/services/site/site.service';

const verify = new Verify()


@Component({
  selector: 'app-question-multiple-form',
  templateUrl: './question-multiple-form.component.html',
  styleUrls: ['./question-multiple-form.component.scss'],
})
export class QuestionMultipleFormComponent extends GenericFormClass implements OnInit {

  @Input() record?:any
  @Input() buttonLabel:string
  public options:any[]


  constructor(
    public site:SiteService,
    public tagsService:TagsProcessingService
  ) {
    super()
  }












  protected createForm() {
    try { this._createForm() }
    catch (error) {
      this.site.events.onError.next({ signature: '0cf585f8-21bc-4ba0-984b-c339ad1882bc', details: error })
    }
  }





      private _createForm() {
        this.form = new FormGroup({
          question: new FormControl(null, { validators: [Validators.required, Validators.minLength(1) ]}),
          answer: new FormControl(null, { validators: [Validators.required, Validators.minLength(1) ]}),
          reason: new FormControl(null),
          newAnswerOption: new FormControl(null, { validators: [Validators.minLength(1) ]}),
          optionEdit: new FormControl(null),
          tags: new FormControl(null)
        })
      }












  protected hookCreateFormPost() {
    try { this._hookCreateFormPost() }
    catch (error) {
      this.site.events.onError.next({ signature: 'b8d6c7e7-c4d5-4bf1-a3c5-4909d2bf4397', details: error })
    }
  }




      private _hookCreateFormPost() {
        this.form.controls.tags.setValue(this.tagsService.records.filter(tagOption => {
          if (tagOption.id in this.isolatedCopy.links.tags) return tagOption
        }))
        this.isolatedCopy.type = 'multiple'
      }












  protected hookBindRecordToFormPost() {
    try { this._hookBindRecordToFormPost() }
    catch (error) {
      this.site.events.onError.next({ signature: 'e7d29460-cd10-4ad3-a87a-a541290d1cbe', details: error })
    }
  }




      private _hookBindRecordToFormPost() {
        if (this.isolatedCopy) this.options = this.isolatedCopy.options
      }












  public onAddAnswerOption() {
    try { this._onAddAnswerOption() }
    catch (error) {
      this.site.events.onError.next({ signature: '86ee9ee4-dff8-44c1-a66d-4beeb236fbad', details: error })
    }
  }




      private _onAddAnswerOption() {
        if (!this.form.value.newAnswerOption) return
        if (!this.options) this.options = [ ]
        this.options.push({ answer: this.form.value.newAnswerOption, correct: false })
        this.form.controls.newAnswerOption.setValue(null)
      }












  public onSelectCorrectAnswerButtonClick(selectedOption, DOMItem) {
    try { this._onSelectCorrectAnswerButtonClick(selectedOption, DOMItem) }
    catch (error) {
      this.site.events.onError.next({ signature: '232bfbed-b859-4cee-b737-b59399fbcc22', details: error })
    }
  }




      private _onSelectCorrectAnswerButtonClick(selectedOption, DOMItem) {
        this.options.forEach(option => {
          if (option.answer === selectedOption.answer) option.correct = true
          else option.correct = false
        })
        this.form.patchValue({ answer: selectedOption.answer })
        DOMItem.close()
      }












  public onEditAnswerButtonClick(selectedOption, DOMItem) {
    try { this._onEditAnswerButtonClick(selectedOption, DOMItem) }
    catch (error) {
      this.site.events.onError.next({ signature: '6c0f026c-b7b2-41e6-8020-8ffe896e68cd', details: error })
    }
  }





      private _onEditAnswerButtonClick(selectedOption, DOMItem) {
        selectedOption.editing = !selectedOption.editing
        DOMItem.close()
      }












  public onUpdateOptionClick(selectedOption, DOMItem) {
    try { this._onUpdateOptionClick(selectedOption, DOMItem) }
    catch (error) {
      this.site.events.onError.next({ signature: '7678aaf2-6199-437b-af7e-c5b13ae18350', details: error })
    }
  }




      private _onUpdateOptionClick(selectedOption, DOMItem) {
        let targetOption = this.options.findIndex(option => option.answer === selectedOption.answer)
        this.options[targetOption].answer = this.form.controls.optionEdit.value
        selectedOption.editing = false;
        (this.form as any).controls.optionEdit.value = null
      }












  public onDeleteAnswerButtonClick(selectedOption) {
    try { this._onDeleteAnswerButtonClick(selectedOption) }
    catch (error) {
      this.site.events.onError.next({ signature: 'e5fa1a61-449e-4a69-bdca-fd63f77c1f8e', details: error })
    }
  }




      private _onDeleteAnswerButtonClick(selectedOption) {
        let removeOption = this.options.findIndex(option => option.answer === selectedOption.answer)
        this.options.splice(removeOption, 1)
      }












  public onSubmitButtonClick() {
    try { this._onSubmitButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: 'abbf7fbb-534b-4c6d-beaa-750f8059d655', details: error })
    }
  }




      private _onSubmitButtonClick() {
        this.form.value.options = this.options
        delete this.form.value.newAnswerOption
        delete this.form.value.optionEdit
        this.bindFormValuesToRecord()
        this.output.emit(this.isolatedCopy)
      }












  public setItemColor(option) {
    try { return this._setItemColor(option) }
    catch (error) {
      this.site.events.onError.next({ signature: 'bd5156f7-acbc-43d1-b581-005db171f33d', details: error })
    }
  }




      private _setItemColor(option) {
        if (option.correct) return `success`
        else return `primary`
      }












  public onTagsSelect(event:CustomEvent) {
    try { this._onTagsSelect(event) }
    catch (error) {
      this.site.events.onError.next({ signature: 'ff6c7862-1cb8-4c7b-a9bd-685f66e57387', details: error })
    }
  }




      private _onTagsSelect(event:CustomEvent) {
        this.form.value.tags = [ ]
        event.detail.value.forEach(tagId => this.form.value.tags.push(tagId))
      }












  public getSelectedStatus(option) {
   try { return this._getSelectedStatus(option) }
   catch (error) {
     this.site.events.onError.next({ signature: '34992bb2-fcd6-4d25-8287-397ea000d842', details: error })
   }
  }




      private _getSelectedStatus(option) {
        if (!verify.property('this.record.links.tags').existsIn(this)) return
        if (Object.keys(this.isolatedCopy.links.tags).includes(option.id)) return true
        else return false
      }

}
