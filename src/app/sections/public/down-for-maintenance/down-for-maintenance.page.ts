import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-down-for-maintenance',
  templateUrl: './down-for-maintenance.page.html',
  styleUrls: ['./down-for-maintenance.page.scss'],
})
export class DownForMaintenancePage implements OnInit {

  constructor(
    public site:SiteService
  ) { }

  ngOnInit() {
  }

}
