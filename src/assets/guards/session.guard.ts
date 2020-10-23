import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';


@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanLoad {

  constructor(
    private app:AppService
  ) { }












  public canLoad(route:Route, segments:UrlSegment[]):Observable<boolean>|Promise<boolean>|boolean {
    if (!this.app.session.authId) this.app.router.navigate(['home'])
    else return true
  }

}
