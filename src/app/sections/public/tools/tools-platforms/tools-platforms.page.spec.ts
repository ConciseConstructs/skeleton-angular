import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolsPlatformsPage } from './tools-platforms.page';

describe('ToolsPlatformsPage', () => {
  let component: ToolsPlatformsPage;
  let fixture: ComponentFixture<ToolsPlatformsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsPlatformsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsPlatformsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
