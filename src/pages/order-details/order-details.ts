import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { WC_URL } from '../../models/appconfig';

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
    this.WooCommerce = WC(WC_URL);
    
  this.order = this.navParams.get('order');
    console.log(this.order.id);

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
