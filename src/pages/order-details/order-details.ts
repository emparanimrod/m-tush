import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {

  order: any;
  WooCommerce: any;
  completed: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  this.order = this.navParams.get('order');
    console.log(this.order);

    if(this.order.status == "completed"){
      this.completed = true;
    } else {
      this.completed = false;
    }
    console.log(this.completed)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  

  }

}
