import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolsServersPage } from './tools-servers.page';

describe('ToolsServersPage', () => {
  let component: ToolsServersPage;
  let fixture: ComponentFixture<ToolsServersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsServersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsServersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
