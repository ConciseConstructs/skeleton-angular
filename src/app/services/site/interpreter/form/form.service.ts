import { Injectable } from '@angular/core';
import { capitalize } from 'src/assets/utilities/capitalize';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }












  public feedbackMessage(formGroup) {
    for (let [ fieldName, properties ] of Object.entries(formGroup.controls) as any) {
      if (properties.valid) continue
      if (properties.errors.required === true) return `${ capitalize(fieldName) } is a required field.`
      else if (properties.errors.minlength.requiredLength > properties.errors.minlength.actualLength) return `${ capitalize(fieldName) } must have at least ${ properties.errors.minlength.requiredLength } characters.`
    }
  }

}
