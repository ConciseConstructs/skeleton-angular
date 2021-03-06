import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './services/app/app.service';
import { Title } from '@angular/platform-browser';
import { environment as saas } from '../environments/environment'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    public app:AppService,
    private platform:Platform,
    private splashScreen:SplashScreen,
    private statusBar:StatusBar,
    private titleService:Title
  ) {
    this.logBasicInfo()
    this.initializeApp()
    this.setBrowserTabTitle()
  }

  public logBasicInfo() {
    console.clear()
    console.log('Version:', saas.version)
    console.log('Production Stage:', saas.production)
    if (saas.downForMaintenance) console.warn('Down for Maintenance:', saas.downForMaintenance)
  }












  public initializeApp() {
    try { this._initializeApp() }
    catch (error) {
      this.app.events.onError.next({ signature: '1049e4eb-5348-45c6-aef7-65304af25884', details: error })
    }
  }




      private _initializeApp() {
        this.platform.ready().then(() => {
          this.statusBar.styleDefault()
          this.splashScreen.hide()
        })
      }












  public setBrowserTabTitle() {
    this.titleService.setTitle(saas.appTitle)
  }












  public get displayBackground():boolean {
    try { return this._displayBackground() }
    catch (error) {
      this.app.events.onError.next({ signature: '6a8ba182-c828-4a69-acb9-34031b11ca7d', details: error })
    }
  }




      private _displayBackground() {
        if (!this.app.layers) return false
        if (this.app.layers['layer-background'].display) return true
        else return false
      }












  public get displayMain():boolean {
    try { return this._displayMain() }
    catch (error) {
      this.app.events.onError.next({ signature: '7f658f53-de41-4912-a798-b0e0f891fde5', details: error })
    }
  }




      private _displayMain() {
        if (!this.app.layers) return false
        if (this.app.layers["layer-main"].display) return true
        else return false
      }












  public get displayPrimaryChannel():boolean {
    try { return this._displayPrimaryChannel() }
    catch (error) {
      this.app.events.onError.next({ signature: '8094daef-9518-4580-9edc-718f359c8f64', details: error })
    }
  }




      private _displayPrimaryChannel() {
        if (!this.app.layers) return false
        if (this.app.layers["layer-primary-channel"].display) return true
        else return false
      }












  public get displaySecondaryChannel():boolean {
    try { return this._displaySecondaryChannel() }
    catch (error) {
      this.app.events.onError.next({ signature: '4791537a-d73a-4202-ae01-6a9d62d18415', details: error })
    }
  }




      private _displaySecondaryChannel() {
        if (!this.app.layers) return false
        if (this.app.layers["layer-secondary-channel"].display) return true
        else return false
      }












  public get displayOverlay():boolean {
    try { return this._displayOverlay() }
    catch (error) {
      this.app.events.onError.next({ signature: '5055c477-dd98-4c69-aa00-8586fe20de75', details: error })
    }
  }




      private _displayOverlay() {
        if (!this.app.layers) return false
        if (this.app.layers['layer-overlay'].display) return true
        else return false
      }

}
