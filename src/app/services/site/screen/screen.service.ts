import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout'
import { EventsService } from '../events/events.service';
import { ScreenSummary } from 'src/assets/types/ScreenSummary.type';


@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  public summary:ScreenSummary
  public device:ScreenSummary['device']
  public size:ScreenSummary['size']
  public orientation:ScreenSummary['orientation']


  constructor(
    private screen:BreakpointObserver,
    private events:EventsService
  ) {
    this.setupEventListeners()
  }




      private setupEventListeners() {
        this.screen.observe(Breakpoints.Web).subscribe(resolution => this.onWebResolution(resolution))
        this.screen.observe(Breakpoints.WebPortrait).subscribe(resolution => this.onWebPortraitResolution(resolution))
        this.screen.observe(Breakpoints.WebLandscape).subscribe(resolution => this.onWebLandscapeResolution(resolution))
        this.screen.observe(Breakpoints.Handset).subscribe(resolution => this.onHandsetResolution(resolution))
        this.screen.observe(Breakpoints.HandsetLandscape).subscribe(resolution => this.onHandsetLandscapeResolution(resolution))
        this.screen.observe(Breakpoints.HandsetPortrait).subscribe(resolution => this.onHandsetPortraitResolution(resolution))
        this.screen.observe(Breakpoints.Tablet).subscribe(resolution => this.onTabletResolution(resolution))
        this.screen.observe(Breakpoints.TabletLandscape).subscribe(resolution => this.onTabletLandscapeResolution(resolution))
        this.screen.observe(Breakpoints.TabletPortrait).subscribe(resolution => this.onTabletPortraitResolution(resolution))
        this.screen.observe(Breakpoints.XSmall).subscribe(resolution => this.onXSmallResolution(resolution))
        this.screen.observe(Breakpoints.Small).subscribe(resolution => this.onSmallResolution(resolution))
        this.screen.observe(Breakpoints.Medium).subscribe(resolution => this.onMediumResolution(resolution))
        this.screen.observe(Breakpoints.Large).subscribe(resolution => this.onLargeResolution(resolution))
        this.screen.observe(Breakpoints.XLarge).subscribe(resolution => this.onXLargeResolution(resolution))
      }












  private onWebResolution(resolution:BreakpointState) {
    if (resolution.matches) this.device = 'pc'
  }












  private onWebPortraitResolution(resolution:BreakpointState) {
    if (resolution.matches) this.orientation = 'portrait'
  }












  private onWebLandscapeResolution(resolution:BreakpointState) {
    if (resolution.matches) this.orientation = 'landscape'
  }












  private onHandsetResolution(resolution:BreakpointState) {
    if (resolution.matches) this.device = 'mobile'
  }












  private onHandsetLandscapeResolution(resolution:BreakpointState) {
    if (resolution.matches) this.orientation = 'landscape'
  }












  private onHandsetPortraitResolution(resolution:BreakpointState) {
    if (resolution.matches) this.orientation = 'portrait'
  }












  private onTabletResolution(resolution:BreakpointState) {
    if (resolution.matches) this.device = 'tablet'
  }












  private onTabletLandscapeResolution(resolution:BreakpointState) {
    if (resolution.matches) this.orientation = 'landscape'
  }












  private onTabletPortraitResolution(resolution:BreakpointState) {
    if (resolution.matches) this.orientation = 'portrait'
  }












  private onXSmallResolution(resolution:BreakpointState) {
    if (resolution.matches) this.size = 'xsmall'
    this.summarize()
  }












  private onSmallResolution(resolution:BreakpointState) {
    if (resolution.matches) this.size = 'small'
    this.summarize()
  }












  private onMediumResolution(resolution:BreakpointState) {
    if (resolution.matches) this.size = 'medium'
    this.summarize()
  }












  private onLargeResolution(resolution:BreakpointState) {
    if (resolution.matches) this.size = 'large'
    this.summarize()
  }












  private onXLargeResolution(resolution:BreakpointState) {
    if (resolution.matches) this.size = 'xlarge'
    this.summarize()
  }












  private summarize() {
    this.summary = { device: this.device, orientation: this.orientation, size: this.size }
    this.events.onScreenSize.next(this.summary)
  }












  public get deviceClasses():string[] {
    try { return this._deviceClasses() }
    catch (error) {
      this.events.onError.next({ signature: 'bc199aa2-546c-496e-bac8-2eccbcab64e7', details: error })
    }
  }




      private _deviceClasses() {
        return Object.values(this.summary)
      }

}
