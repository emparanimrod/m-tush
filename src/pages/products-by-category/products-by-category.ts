import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
// import { WC_URL } from "../../models/appconfig";
import { CartPage } from '../cart/cart';
import { ProductDetailsPage } from '../product-details/product-details';


@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController ) {

    this.page = 1;
    this.category = this.navParams.get("category");

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

    this.WooCommerce.getAsync("products?filter[category]="+ this.category.slug).then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
     }, (err) =>{
      console.log(err)
     })


  }

  openProductPage(product){
    
        this.navCtrl.push(ProductDetailsPage, {"product": product})
      }
    

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProductsByCategoryPage');
  // }
  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

}
