import { Component } from '@angular/core';
import { SiteService } from '../../../services/site/site.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConciseComponent } from 'src/assets/classes/ConciseComponent.class';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends ConciseComponent {

  public form:FormGroup
  public mode:'login'|'signup'
  public dataEntryOptions:SelectItem[]


  constructor(
    public site:SiteService,
  ) {
    super(site)
  }





  protected init() {
    try { this._init() }
    catch (error) {
      this.onError({ signature: '0882db36-d5aa-40a2-bb2f-af5430a94e77', details: error })
    }
  }




      private _init() {
        if (this.site.session.authId) this.site.router.navigate(['dashboard'])
        else this.createFrontDoor()
      }




          private createFrontDoor() {
            this.setDefaultValues()
            this.createForm()
            this.setupEventListeners()
            this.createDataEntryOptions()
          }




              private setDefaultValues() {
                this.mode = 'login'
              }




              private createForm() {
                this.form = new FormGroup({
                  mode: new FormControl(this.mode),
                  email: new FormControl(null, { validators: [Validators.required] }),
                  password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] })
                })
              }




              private setupEventListeners() {
                this.eventListeners.push(this.site.events.onSignUpOutcome.subscribe(outcome => this.onSignUpOutcome(outcome)))
                this.eventListeners.push(this.site.events.onLoginOutcome.subscribe(outcome => this.onLoginOutcome(outcome)))
              }




              private createDataEntryOptions() {
                this.dataEntryOptions = [
                  { label: 'Login', value: 'login' },
                  { label: 'Signup', value: 'signup' }
                ]
              }












  public segmentChanged(event) {
    try { this._segmentChanged(event) }
    catch (error) {
      this.onError({ signature: '5ce08b58-dfae-4d8f-a72b-633dca7a332a', details: error })
    }
  }




      private _segmentChanged(event) {
        this.mode = this.site.interpreter.componentOutput('segmentButton', event)
      }












  public onProceedButtonClick() {
    try { this._onProceedButtonClick() }
    catch (error) {
      this.onError({ signature: 'e5e5d756-5f61-454b-a966-4eabec8c5da9', details: error })
    }
  }




      private _onProceedButtonClick() {
        if (this.mode === 'signup') this.attemptSignup()
        else this.attemptLogin()
      }




          private attemptSignup() {
            this.site.registration.signUp({ saasName: this.site.saasName, username: this.form.value.email, password: this.form.value.password })
          }




          private attemptLogin() {
            this.site.login.attemptLogin({ saasName: this.site.saasName, username: this.form.value.email, password: this.form.value.password })
          }












  private onSignUpOutcome(outcome) {
    if (!outcome.success) this.site.ui.alert(this.site.interpreter.error(outcome.details))
    else this.site.ui.alert(this.site.settings.messages.signUpSuccess)
  }












  private onLoginOutcome(outcome) {
    if (!outcome.success && outcome.details) this.site.ui.alert(this.site.interpreter.error(outcome.details))
  }












  public get modeLabel() {
    try { return this._modelLabel() }
    catch (error) {
      this.onError({ signature: '030ea9ad-6eae-4bf2-903f-3acb6fba53ee', details: error })
    }
  }




      private _modelLabel() {
        if (this.mode === 'signup')  return 'Sign Up'
        else return 'Login'
      }

}
