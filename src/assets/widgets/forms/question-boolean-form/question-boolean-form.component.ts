import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericFormClass } from '../GerericFormClass';
import { TagsProcessingService } from 'src/app/services/processors/tags-processing/tags.processing.service';
import { Verify } from '../../../utilities/verifyPropertyExistsIn'
import { SiteService } from 'src/app/services/site/site.service';

const verify = new Verify()


@Component({
  selector: 'app-question-boolean-form',
  templateUrl: './question-boolean-form.component.html',
  styleUrls: ['./question-boolean-form.component.scss'],
})
export class QuestionBooleanFormComponent extends GenericFormClass implements OnInit {


  constructor(
    public site:SiteService,
    public tagsService:TagsProcessingService
  ) {
    super()
  }













  protected createForm() {
    try { this._createForm() }
    catch (error) {
      this.site.events.onError.next({ signature: '29bbda58-0dcc-4b02-8c6b-e183f9d72e02', details: error })
    }
  }




      private _createForm() {
        this.form = new FormGroup({
          question: new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
          answer: new FormControl(null, { validators: [Validators.required]}),
          reason: new FormControl(null),
          tags: new FormControl(null)
        })
      }












  protected hookCreateFormPost() {
    try { this._hookCreateFormPost() }
    catch (error) {
      this.site.events.onError.next({ signature: '4f6428eb-cb26-40f5-955c-5cd4955dd9b6', details: error })
    }
  }




      private _hookCreateFormPost() {
        this.form.controls.tags.setValue(this.tagsService.records.filter(tagOption => {
          if (tagOption.id in this.isolatedCopy.links.tags) return tagOption
        }))
        this.isolatedCopy.type = 'boolean'
      }












  public onTagsSelect(event:CustomEvent) {
    try { this._onTagsSelect(event) }
    catch (error) {
      this.site.events.onError.next({ signature: '6f3a63e1-28e9-448d-9fa5-3b4ec52cdf8e', details: error })
    }
  }




      private _onTagsSelect(event) {
        this.form.value.tags = [ ]
        event.detail.value.forEach(tagId => this.form.value.tags.push(tagId))
      }












  public getSelectedStatus(option) {
    try { return this._getSelectedStatus(option) }
    catch (error) {
      this.site.events.onError.next({ signature: 'e702563d-c313-4ca8-99e4-4bad558298d4', details: error })
    }
  }





      private _getSelectedStatus(option) {
        if (!verify.property('this.record.links.tags').existsIn(this)) return
        if (Object.keys(this.isolatedCopy.links.tags).includes(option.id)) return true
        else return false
      }












  public onButtonClick() {
    try { this._onButtonClick() }
    catch (error) {
      this.site.events.onError.next({ signature: 'c1a609e5-c1e2-4d73-841b-5375051eb762', details: error })
    }
  }




      private _onButtonClick() {
        this.form.value.answer = (this.form.value.answer === 'true')
        this.bindFormValuesToRecord()
        this.output.emit(this.form.value)
      }












  public getCheckedState(value:boolean) {
    try { return this._getCheckedState(value) }
    catch (error) {
      this.site.events.onError.next({ signature: '24e204e7-3075-4a6d-bfc8-29c4f08165bd', details: error })
    }
  }




      private _getCheckedState(value) {
        if (value === true) return true
        else return false
      }

}
