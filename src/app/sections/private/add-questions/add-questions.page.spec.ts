import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonicModule } from '@ionic/angular';
import { WidgetsModule } from '../../../../assets/widgets/widgets.module'
import { AddQuestionsPage } from './add-questions.page';

describe('AddQuestionsPage', () => {
  let component:any;
  let fixture: ComponentFixture<AddQuestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionsPage ],
      imports: [
        IonicModule.forRoot(), 
        WidgetsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AddQuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }))


  it('Should create.', () => {
    expect(component).toBeTruthy();
  })


  it('Should prepare page.', ()=> {
    let preparePageFunction = spyOn(component, 'preparePage')
    component.ngOnInit()
    expect(preparePageFunction).toHaveBeenCalled()
  })


  it('Should set the correct row color by odd/even index.', ()=> {
    expect(component.setRowColor(0)).toEqual('even')
    expect(component.setRowColor(1)).toEqual('odd')
    expect(component.setRowColor(2)).toEqual('even')
  })


  it('Should call handleUiUpdateForMobileComponent for toggling mobile checkboxes.', ()=> {
    Object.defineProperty(component.site, 'renderFor', {
      get: () => { return 'mobile' },
    })
    component.setSelectedQuestions = ()=> { }
    component.handleUiUpdateForMobileComponent = ()=> { }
    let handleUiUpdateForMobileComponent = spyOn(component, 'handleUiUpdateForMobileComponent')
    component.onToggleQuestion()
    expect(handleUiUpdateForMobileComponent).toHaveBeenCalled()
  })


  it('Should NOT call handleUiUpdateForMobileComponent for toggling non-mobile checkboxes.', ()=> {
    Object.defineProperty(component.site, 'renderFor', {
      get: () => { return 'notMobile' },
    })
    component.setSelectedQuestions = ()=> { }
    component.handleUiUpdateForMobileComponent = ()=> { }
    let handleUiUpdateForMobileComponentFunction = spyOn(component, 'handleUiUpdateForMobileComponent')
    component.onToggleQuestion()
    expect(handleUiUpdateForMobileComponentFunction).not.toHaveBeenCalled()
  })


});
