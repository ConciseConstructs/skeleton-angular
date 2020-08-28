import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolsClientsPage } from './tools-clients.page';

describe('ToolsClientsPage', () => {
  let component: ToolsClientsPage;
  let fixture: ComponentFixture<ToolsClientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsClientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
