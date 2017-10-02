import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductsByCategoryPage } from "../products-by-category/products-by-category";
import * as WC from 'woocommerce-api';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {
  homePage: Component;
  WooCommerce: any;
  categories: any[];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.homePage = HomePage;
    this.categories = [];
    
  
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
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad Menu');
  // };
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
}
openHomePage(pageName: string){
  if(pageName == "home"){
    this.navCtrl.push(HomePage);
  }
}
}
