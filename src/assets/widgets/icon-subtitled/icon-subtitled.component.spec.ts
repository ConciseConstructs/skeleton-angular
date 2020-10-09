import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IconSubtitledComponent } from './icon-subtitled.component';

describe('IconSubtitledComponent', () => {
  let component: IconSubtitledComponent;
  let fixture: ComponentFixture<IconSubtitledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSubtitledComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IconSubtitledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
