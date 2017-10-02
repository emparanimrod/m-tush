import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  WooCommerce: any;
  newUser: any = {};
  billing_shipping_same: boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public toastCtrl: ToastController ) {

    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};
    this.newUser.billing_shipping_same = false;

    this.WooCommerce = WC({
      url: 'https://cloud.edgetech.co.ke/m-tush',
      consumerKey: 'ck_3106173da4bf0f0269cd58e8be438139dc515b87',
      consumerSecret: 'cs_ee6a004c51a4206d4d9a374b1b05adac24927f53',
      version: 'v3',
      // wpAPI: false,
      // version: 'wc/v1',
      verifySsl: false,
      queryStringAuth: true})

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SignupPage');
  // }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
  }

  // checkEmail(){

  //   let validEmail = false;

  //   let reg = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  //   if(reg.test(this.newUser.email)){

  //   }; 

  // }

  signUp(){

    let customerData= {
      customer: {}
    }

    customerData.customer = {
        "email": this.newUser.email,
        "first_name": this.newUser.first_name,
        "last_name": this.newUser.last_name,
        "user_name": this.newUser.user_name,
        "password": this.newUser.password,
        "billing_address": {
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "company": "",
          "address_1": this.newUser.billing_address.address_1,
          "address_2": this.newUser.billing_address.address_2,
          "city": this.newUser.billing_address.city,
          "state": this.newUser.billing_address.state,
          // "postcode": "00100",
          "country": this.newUser.billing_address.country,
          "email": this.newUser.email,
          "phone": this.newUser.billing_address.phone
        },
        "shipping_address": {
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "company": "",
          "address_1": this.newUser.shipping_address.address_1,
          "address_2": this.newUser.shipping_address.address_2,
          "city": this.newUser.shipping_address.city,
          "state": this.newUser.shipping_address.state,
          // "postcode": "",
          "country": this.newUser.shipping_address.country,
        }
    }
    if(this.billing_shipping_same){
      this.newUser.shipping_address = this.newUser.shipping_address;
    }

    this.WooCommerce.postAsync('customers', customerData).then( (data) => {

      console.log(JSON.parse(data.body));
      let response =(JSON.parse(data.body));

      if(response.customer){
        this.alertCtrl.create({
          title: "Success",
          message: "Your account has been successfully created! You may now Login",
          buttons: [{
            text: "Login",
            handler: () => {
              //next up
            }
          }]
        }).present();
      } else if (response.errors){
        this.toastCtrl.create({
          message: response.errors[0].message,
          showCloseButton: true
        }).present();
      }

    })
  }

}
