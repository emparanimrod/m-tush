import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductsByCategoryPage } from "../products-by-category/products-by-category";
import * as WC from 'woocommerce-api';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { Storage } from "@ionic/storage";
import { CartPage } from '../cart/cart';
import { CategoriesPage } from '../categories/categories';
import { OrdersPage } from '../orders/orders';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {
  homePage: Component;
  WooCommerce: any;
  categories: any[];
  loggedIn: boolean;
  user: any


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
               public alertCtrl: AlertController ) {
  
    this.homePage = HomePage;
    this.categories = [];
    this.user = {};
    
  
  this.WooCommerce = WC({
    url: 'https://cloud.edgetech.co.ke/m-tush',
    consumerKey: 'ck_3106173da4bf0f0269cd58e8be438139dc515b87',
    consumerSecret: 'cs_ee6a004c51a4206d4d9a374b1b05adac24927f53',
    version: 'v3',
    // wpAPI: false,
    // version: 'wc/v1',
    verifySsl: false,
    queryStringAuth: true
  });

  this.WooCommerce.getAsync('products/categories').then((data) =>{
    console.log(JSON.parse(data.body).product_categories);

    let temp: any[] = JSON.parse(data.body).product_categories;

    for( let i = 0; i < temp.length; i ++ ){
      if(temp[i].parent == 0){
        this.categories.push(temp[i]);
      }
    }

  }, (err) => {
    console.log(err)
  })
  }

  ionViewDidEnter() {
    
    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) =>{

        if(userLoginInfo != null){

          console.log("user logged in");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;

        } else {

          console.log("No user is logged in");
          this.user = {};
          this.loggedIn = false;
        }

      } )
    })


  }

  openCategoryPage(category){

    this.navCtrl.push(ProductsByCategoryPage, {'category': category});

  }
openPage(pageName: string){
  if(pageName == "signup"){
    this.navCtrl.push(SignupPage);
  }
  if(pageName == "login"){
    this.navCtrl.push(LoginPage);
  }
  if(pageName == "categories"){
    this.navCtrl.push(CategoriesPage);
  }
  if(pageName == "orders"){
    this.navCtrl.push(OrdersPage);
  }
  if(pageName == "profile"){
    this.navCtrl.push(ProfilePage);
  }
  if(pageName == "settings"){
    this.navCtrl.push(SettingsPage);
  }
  if(pageName == "cart"){
    let modal = this.modalCtrl.create(CartPage);
    modal.present();
  }
  if(pageName == "logout"){
    this.storage.remove("userLoginInfo").then( () => {
      this.user = {};
      this.loggedIn = false;

      // this.toastCtrl.create({
      //   message: "You have successfully logged out",
      //   duration: 4000

      // }).present();

      this.alertCtrl.create({
        title: "Success!!", 
        message: "You have been Successfully Logged Out",
        buttons: ['Dismiss']

      }).present();

    })
  }
}
openHomePage(pageName: string){
  if(pageName == "home"){
    this.navCtrl.push(HomePage);
  }
}
openCart(){
  this.modalCtrl.create(CartPage).present();
}
}
