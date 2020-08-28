import { SiteService } from 'src/app/services/site/site.service';
import { Subscription } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


export abstract class ConciseComponent implements OnInit, OnDestroy {

  protected eventListeners:Subscription[]
  protected backUrl:string
  protected route?:ActivatedRoute


  constructor(
    public site:SiteService
  ) {}












  public ngOnInit() {
    this.eventListeners = [ ]
    if (this.route) this.route.paramMap.subscribe(paramMap => this.onNewParamMap(paramMap))
    this.init()
  }












  public ionViewWillEnter() {
    this.init()
  }












  protected init() { }












  protected onNewParamMap(paramMap:ParamMap) {
    try { this._onNewParamMap(paramMap) }
    catch (error) {
      this.site.events.onError.next({ signature: '3a872d59-cfa7-49da-8741-b1dcb5a6cfb3', details: error })
    }
  }



      private _onNewParamMap(paramMap) {
        if (!paramMap.has('id')) this.hasNoIdProvided()
        else this.loadRecord(paramMap)
      }




          protected hasNoIdProvided() {
            console.warn('No Id Was Provided to Fetch Record')
          }




          protected loadRecord(paramMap:ParamMap) { }












  protected navigateBack() {
    try { this._navigateBack() }
    catch (error) {
      this.site.events.onError.next({ signature: '779b5fd8-d8ba-4e91-be0c-21d6dfaea1de', details: error })
    }
  }




      private _navigateBack() {
        if (!this.backUrl) throw new Error()
        else this.site.router.navigate([this.backUrl])
      }












  ngOnDestroy() {
    if (this.eventListeners) this.eventListeners.forEach(subscription => subscription.unsubscribe())
  }












  protected onError(params:{ signature:string, details:any }) {
    this.site.events.onError.next(params)
  }

}
