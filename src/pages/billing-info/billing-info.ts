import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-billing-info',
  templateUrl: 'billing-info.html',
})
export class BillingInfoPage {

  WooCommerce: any;
  userInfo: any;
  billingInfo: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage ) {

    //woocommerce credentials

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

    this.storage.get("userLoginInfo").then( (userLoginInfo) => {
      
            this.userInfo = userLoginInfo.user;
      
            let email = userLoginInfo.user.email; 
      
            this.WooCommerce.getAsync("customers/email/"+email).then( (data) => {
              console.log
              this.billingInfo = JSON.parse(data.body).customer;
              // loading.dismiss();
            })
      
          })
  }



}
