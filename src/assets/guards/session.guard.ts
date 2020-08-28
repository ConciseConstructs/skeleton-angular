import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { SiteService } from 'src/app/services/site/site.service';


@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanLoad {

  constructor(
    private site:SiteService
  ) { }












  public canLoad(route:Route, segments:UrlSegment[]):Observable<boolean>|Promise<boolean>|boolean {
    if (!this.site.session.authId) this.site.router.navigate(['home'])
    else return true
  }

}
