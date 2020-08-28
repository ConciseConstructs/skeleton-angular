import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolsDatabasesPage } from './tools-databases.page';

describe('ToolsDatabasesPage', () => {
  let component: ToolsDatabasesPage;
  let fixture: ComponentFixture<ToolsDatabasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsDatabasesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolsDatabasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
