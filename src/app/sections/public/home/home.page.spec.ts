import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms'
import { WidgetsModule } from '../../../../assets/widgets/widgets.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({ template: '' })
export class DummyComponent { }

describe('HomePage', () => {

  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage, DummyComponent ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        WidgetsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [ { path: 'dashboard', component: DummyComponent } ]
        )
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }))

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set the mode property to "login".', ()=> {
    expect(component.mode).toEqual('login')
  })

  it('Should create a form with controls: mode, email, password.', ()=> {
    expect(component.form).toBeTruthy()
    expect(component.form.controls.mode).toBeTruthy()
    expect(component.form.controls.email).toBeTruthy()
    expect(component.form.controls.password).toBeTruthy()
  })

  it('Should listen for onSignUpOutcome & onLoginOutcome events.', ()=> {
    expect((component as any).eventListeners.length).toEqual(2)
  })

  it('Should create correct dataEntryOptions for UI components.', ()=> {
    expect(component.dataEntryOptions).toEqual([
        { label: 'Login', value: 'login' },
        { label: 'Signup', value: 'signup' }
      ])
  })

  it('Should call attemptSignup if mode is "signup".', ()=> {
    let correctFunction = spyOn((component as any), 'attemptSignup')
    component.mode = 'signup'
    component.onProceedButtonClick()
    expect(correctFunction).toHaveBeenCalled()
  })

  it('Should call attemptLogin if mode is "login".', ()=> {
    let correctFunction = spyOn((component as any), 'attemptLogin')
    component.mode = 'login'
    component.onProceedButtonClick()
    expect(correctFunction).toHaveBeenCalled()
  })

  it('Should display UI message onSignUpOutcome event.', ()=> {
    let alertFunction = spyOn(component.site.ui, 'alert')
    expect((component as any).onSignUpOutcome).toBeTruthy();
    (component as any).onSignUpOutcome({ success: true })
    expect(alertFunction).toHaveBeenCalled();
  })

  it('Should navigate to dashboard with successful onLoginOutcome event.', ()=> {
    expect(component).toBeTruthy()
    let navigateFunction = spyOn(component.site.router, 'navigate');
    (component as any).onLoginOutcome({ success: true })
    expect(navigateFunction).toHaveBeenCalledWith(['dashboard'])
  })
});
