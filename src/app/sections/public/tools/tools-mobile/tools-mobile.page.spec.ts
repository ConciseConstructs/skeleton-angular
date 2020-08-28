import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolsMobilePage } from './tools-mobile.page';

describe('ToolsMobilePage', () => {
  let component: ToolsMobilePage;
  let fixture: ComponentFixture<ToolsMobilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsMobilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
