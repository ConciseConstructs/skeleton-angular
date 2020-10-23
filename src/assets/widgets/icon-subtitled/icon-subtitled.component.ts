import { Component, OnInit, Input, Output } from '@angular/core';
import { IconSubtitled } from 'src/assets/types/IconSubtitled.type';
import { EventEmitter } from '@angular/core'
import { AppService } from 'src/app/services/app/app.service';


@Component({
  selector: 'app-icon-subtitled',
  templateUrl: './icon-subtitled.component.html',
  styleUrls: ['./icon-subtitled.component.scss'],
})
export class IconSubtitledComponent implements OnInit {

  @Input() icon:IconSubtitled
  @Output() output:EventEmitter<string[]>


  constructor(
    public app:AppService
  ) {
    this.output = new EventEmitter()
  }












  ngOnInit() {

  }












  public onClick(icon) {
    this.output.emit(icon.url)
  }

}
