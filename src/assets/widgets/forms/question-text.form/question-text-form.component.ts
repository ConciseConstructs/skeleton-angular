import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericFormClass } from '../GerericFormClass';
import { TagsProcessingService } from 'src/app/services/processors/tags-processing/tags.processing.service';
import { Verify } from '../../../utilities/verifyPropertyExistsIn'
import { Question } from 'src/assets/models/Question.model';
import { SiteService } from 'src/app/services/site/site.service';

const verify = new Verify()


@Component({
  selector: 'app-question-text-form',
  templateUrl: './question-text-form.component.html',
  styleUrls: ['./question-text-form.component.scss'],
})
export class QuestionTextFormComponent extends GenericFormClass implements OnInit {

  public isolatedCopy:Question


  constructor(
    public site:SiteService,
    public tagsService:TagsProcessingService,
  ) {
    super()
  }












  protected createForm() {
    try { this._createForm() }
    catch (error) {
      this.site.events.onError.next({ signature: '32a1d418-6f65-44de-9da0-37f0c90b4889', details: error })
    }
  }




      private _createForm() {
        this.form = new FormGroup({
          question: new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
          answer: new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
          reason: new FormControl(null),
          tags: new FormControl(null)
        })
      }












  protected hookCreateFormPost() {
    try { this._hookCreateFormPost() }
    catch (error) {
      this.site.events.onError.next({ signature: '10d68f2d-42a7-4c74-a2b1-f9ab9079ad54', details: error })
    }
  }





      private _hookCreateFormPost() {
        this.form.controls.tags.setValue(this.tagsService.records.filter(tagOption => {
          if (tagOption.id in this.isolatedCopy.links.tags) return tagOption
        }))
        this.isolatedCopy.type = 'text'
      }












  public onTagsSelect(event:CustomEvent) {
    try { this._onTagsSelect(event) }
    catch (error) {
      this.site.events.onError.next({ signature: '07c70276-6b3c-4ff5-a42d-9ace2fd5e3f0', details: error })
    }
  }




      private _onTagsSelect(event:CustomEvent) {
        this.form.value.tags = [ ]
        event.detail.value.forEach(tagId => this.form.value.tags.push(tagId))
      }












  public getSelectedStatus(option) {
    try { return this._getSelectedStatus(option) }
    catch (error) {
      this.site.events.onError.next({ signature: 'd1b42bee-95ae-424c-b009-72fce0d85259', details: error })
    }
  }




      private _getSelectedStatus(option) {
        if (!verify.property('this.record.links.tags').existsIn(this)) return
        else if (Object.keys(this.isolatedCopy.links.tags).includes(option.id)) return true
        else return false
      }












  protected hookMutateDataBeforeEmit() {
    try { this._hookMutateDataBeforeEmit() }
    catch (error) {
      this.site.events.onError.next({ signature: '58b18aef-3ecc-48c8-b066-04dc995ca864', details: error })
    }
  }




      private _hookMutateDataBeforeEmit() {
        this.isolatedCopy.links.tags = { }
        if (this.site.deviceClasses.includes('mobile')) (this.isolatedCopy as any).tags.forEach(tagId => this.isolatedCopy.links.tags[tagId] = null)
        else (this.isolatedCopy as any).tags.forEach(tag => this.isolatedCopy.links.tags[tag.id] = null)
        delete (this.isolatedCopy as any).tags
      }

}
