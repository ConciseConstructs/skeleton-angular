import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconSubtitled } from 'src/assets/types/IconSubtitled.type';
import { AppService } from 'src/app/services/app/app.service';


@Component({
  selector: 'app-icons-container',
  templateUrl: './icons-container.component.html',
  styleUrls: ['./icons-container.component.scss'],
})
export class IconsContainerComponent {

  @Input() icons:IconSubtitled[]
  @Output() output:EventEmitter<string[]>


  constructor(
    public app:AppService
  ) {
    this.output = new EventEmitter()
  }












  public onOutput(urlArray:string[]) {
    this.output.emit(urlArray)
  }

}
