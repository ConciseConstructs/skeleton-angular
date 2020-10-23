import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-down-for-maintenance',
  templateUrl: './down-for-maintenance.page.html',
  styleUrls: ['./down-for-maintenance.page.scss'],
})
export class DownForMaintenancePage implements OnInit {

  constructor(
    public app:AppService
  ) { }

  ngOnInit() {
  }

}
