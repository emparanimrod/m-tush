import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { WOOCOMMERCE_CREDENTIALS } from "../models/woocommerce.credentials";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Menu } from '../pages/menu/menu';
import { ProductsByCategoryPage } from "../pages/products-by-category/products-by-category";
import { ProductDetailsPage } from "../pages/product-details/product-details";
// import * as WC from "woocommerce-api";
// import { WC_URL } from "../models/appconfig";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartPage } from '../pages/cart/cart';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { CheckoutPage } from '../pages/checkout/checkout';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Menu,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage, 
    LoginPage,
    CheckoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Menu,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage, 
    LoginPage,
    CheckoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
