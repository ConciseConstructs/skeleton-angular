import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconSubtitled } from 'src/assets/types/IconSubtitled.type';
import { SiteService } from 'src/app/services/site/site.service';


@Component({
  selector: 'app-icons-container',
  templateUrl: './icons-container.component.html',
  styleUrls: ['./icons-container.component.scss'],
})
export class IconsContainerComponent {

  @Input() icons:IconSubtitled[]
  @Output() output:EventEmitter<string[]>


  constructor(
    public site:SiteService
  ) {
    this.output = new EventEmitter()
  }












  public onOutput(urlArray:string[]) {
    this.output.emit(urlArray)
  }

}
