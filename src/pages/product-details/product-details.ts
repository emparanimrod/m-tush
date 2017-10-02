import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from "@ionic/storage";
import { CartPage } from '../cart/cart'

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController ) {

    this.product = this.navParams.get('product');
    console.log(this.product)

    this.WooCommerce = WC({
      url: 'https://cloud.edgetech.co.ke/m-tush',
      consumerKey: 'ck_3106173da4bf0f0269cd58e8be438139dc515b87',
      consumerSecret: 'cs_ee6a004c51a4206d4d9a374b1b05adac24927f53',
      version: 'v1',
      // wpAPI: false,
      // version: 'wc/v1',
      verifySsl: false,
      queryStringAuth: true
    });

    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data)=>{

      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);

    }, (err) => {
      console.log(err);
    })
    
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProductDetailsPage');
  // }
  addToCart(product){

    this.storage.get("cart").then((data)=> {
      // console.log(data);
      //cart module
      if(data == null || data.length == 0){

        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        });
      } else {

        let added = 0;

        for(let i = 0; i < data.length; i++){
          if(product.id == data[i].product.id){
            console.log("Product is already in the cart");

            let qty = data[i].qty;

            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }
        if(added == 0){
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          });
        }
      }

      this.storage.set("cart", data).then( ()=>{

        console.log("cart updated");
        console.log(data);

        this.toastCtrl.create({
          message: "Your Cart has been Updated",
          duration: 3000
        }).present();

      })

    })
  }
openCart(){
     this.modalCtrl.create(CartPage).present();
   }
}
