import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericFormClass } from '../GerericFormClass';
import { SiteService } from 'src/app/services/site/site.service';


@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss'],
})
export class TagFormComponent extends GenericFormClass {

  constructor(
    public site:SiteService
  ) {
    super()
  }












  protected createForm() {
    try { this._createForm() }
    catch (error) {
      this.site.events.onError.next({ signature: '0bbcfd88-e983-44be-92aa-9c113ef1b9ee', details: error })
    }
  }




      private _createForm() {
        this.form = new FormGroup({
          name: new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
          description: new FormControl(null),
        })
      }

}
