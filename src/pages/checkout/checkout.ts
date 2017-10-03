import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  newOrder: any; 
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  WooCommerce: any;
  userInfo: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public storage: Storage ) {

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

    this.newOrder = {}; 
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "mpesa", method_title: "M-Pesa" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" }
    ];

    this.storage.get("userLoginInfo").then( (userLoginInfo) => {

      this.userInfo = userLoginInfo.user;

      let email = userLoginInfo.user.email; 

      this.WooCommerce.getAsync("customers/email/"+email).then( (data) => {

        this.newOrder = JSON.parse(data.body).customer;
      })

    })
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;

    if(this.billing_shipping_same){
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }
  }

  placeOrder(){

    let orderItems: any[] = [];
    let data: any = {};
    let paymentData: any = {};

    this.paymentMethods.forEach( (element, index) =>{
      if(element.method_id == this.paymentMethod){
        paymentData = element;
      }
    });

    data = {
      payment_details : {
        method_id: paymentData.method_id,
        method_title: paymentData.method_title,
        paid: true
      },

      billing_address: this.newOrder.billing_address,
      shipping_address: this.newOrder.shipping_address,
      customer_id: this.userInfo.id || '',
      line_items: orderItems
    };

    if(paymentData.method_id == "paypal"){

    } else {
      this.storage.get("cart").then( (cart) => {

        cart.forEach( (element, index) => {
          orderItems.push({
            product_id: element.product.id,
            quantity: element.qty
          });
        });

        data.line_items = orderItems;

        let orderData: any = {};

        orderData.order = data;

        this.WooCommerce.postAsync("orders", orderData).then((data) => {

          console.log(JSON.parse(data.body).order);

        })


      })
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

}
