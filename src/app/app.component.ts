
    import { Component, ViewChild } from '@angular/core';
    import { Nav, Platform } from 'ionic-angular';
    import { StatusBar } from '@ionic-native/status-bar';
    import { SplashScreen } from '@ionic-native/splash-screen';
    import { OneSignal } from "@ionic-native/onesignal";
    import { Menu } from '../pages/menu/menu';
    import { OrderPlacedPage } from '../pages/order-placed/order-placed';

    // import { SignupPage } from '../pages/signup/signup';
    @Component({
      templateUrl: 'app.html'
    })
    export class MyApp {
      @ViewChild(Nav) nav: Nav;
    
      
      rootPage: any = Menu;
      // rootPage: any = OrderPlacedPage;
  
    
      constructor(public platform: Platform, 
                  public statusBar: StatusBar, 
                  public splashScreen: SplashScreen, 
                  public oneSignal: OneSignal ) {
        this.initializeApp();
        
      }
    
      initializeApp() {
        this.platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          // this.statusBar.overlaysWebView(true);
          this.statusBar.backgroundColorByHexString('#25aae1');
          this.splashScreen.show();
          //onesignal code

          this.oneSignal.startInit('205b8af8-fa5e-4e86-b7ab-c682ad141463', '191192921743');
          
          this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
          
          this.oneSignal.handleNotificationReceived().subscribe(() => {
           // do something when notification is received
          });
          
          this.oneSignal.handleNotificationOpened().subscribe(() => {
            // do something when a notification is opened
          });
          
          this.oneSignal.endInit();
        });
      }
    
    }

