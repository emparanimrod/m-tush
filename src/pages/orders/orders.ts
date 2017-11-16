import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from "@ionic/storage";
import { OrderDetailsPage } from '../order-details/order-details';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  WooCommerce: any;
  username: any;
  email: any;
  userInfo: any;
  id: any[];
  orders:any[];
  myOrders: string = 'orders';
  completed: boolean;
  cancelled: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public storage: Storage,
              public loadingCtrl: LoadingController) {

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
      this.username = userLoginInfo.user.username;
      this.email = userLoginInfo.user.email;
      this.userInfo = userLoginInfo.user;
      console.log(this.userInfo.id);
      this.id = this.userInfo.id;

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        showBackdrop: false,
        cssClass: 'backdrop',

        });
    loading.present();
      
      this.WooCommerce.getAsync('orders?filter[customer_id]='+ this.userInfo.id).then((data) => {
      console.log(JSON.parse(data.body).orders);
      this.orders = JSON.parse(data.body).orders;

      loading.dismiss();
    }, (err) =>{
      console.log(err)
     });
    });
  }

  ionViewDidLoad() {
    
   
   
  }
  openOrder(order){
    
        this.navCtrl.push(OrderDetailsPage, {"order": order})
      }

}
