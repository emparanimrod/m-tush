import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import * as WC from 'woocommerce-api';
import { WC_URL } from '../../models/appconfig';
import { HomePage } from '../home/home';
import { OrderPlacedPage } from '../order-placed/order-placed';
import { MpesaPage } from '../mpesa/mpesa';

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
  orderDetails: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController ) {

                this.WooCommerce = WC(WC_URL);

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'backdrop'
      });
  loading.present();

    this.newOrder = {}; 
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "easypay", method_title: "M-Pesa" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      // { method_id: "paypal", method_title: "PayPal" }
    ];


    this.storage.get("userLoginInfo").then( (userLoginInfo) => {

      this.userInfo = userLoginInfo.user;

      let email = userLoginInfo.user.email; 

      this.WooCommerce.getAsync("customers/email/"+email).then( (data) => {

        this.newOrder = JSON.parse(data.body).customer;
        console.log(this.newOrder);
        loading.dismiss();
      });

    });

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

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'backdrop'
      });
      loading.present();


    this.paymentMethods.forEach( (element, index) =>{
      if(element.method_id == this.paymentMethod){
        paymentData = element;
      }
    });

    data = {
      payment_details : {
        method_id: paymentData.method_id,
        method_title: paymentData.method_title,
        paid: false
      },

      billing_address: this.newOrder.billing_address,
      shipping_address: this.newOrder.shipping_address,
      customer_id: this.userInfo.id || '',
      line_items: orderItems
    };

    if(paymentData.method_id == "easypay"){
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
                console.log(data);
               
        
                // this.WooCommerce.postAsync("orders", orderData).then((response) => {
                //   console.log(response);});
        
                  this.WooCommerce.postAsync("orders", orderData).then((data) => {
                    console.log(data);
                  // console.log(JSON.parse(data.body).order);
        
                  if(data.error){
                    
                    this.alertCtrl.create({
                      title: "Error",
                      message: "could not complete your order. Please Try again",
                      buttons: ['okay']
                    });
                    loading.dismiss();
                  } else {
                  
        
                  this.orderDetails = JSON.parse(data.body).order;
                 console.log(this.orderDetails);
        
                 this.viewCtrl.dismiss();

                 this.alertCtrl.create({
                  title: "Success!!", 
                  message: "You have successfully placed your order number {{orderDetails.id}} ",
                  buttons: [
                    {text: 'Okay',
                    handler: () => {
                      this.viewCtrl.dismiss();
                      
                    } }]
          
                }).present(); 

                this.navCtrl.push(MpesaPage, {"order": this.orderDetails});

                  // this.storage.remove("cart").then( () => {
                  //   loading.dismiss();
                  
        
        
                    
                    // this.viewCtrl.dismiss();
                    // this.navCtrl.push(OrderPlacedPage);
                   
                    
                    // this.navCtrl.push(OrderPlacedPage, {'order': order} );
                    //  {'order': order}
              //     });
                }
                });
              });
              // this.navCtrl.push(OrderPlacedPage);
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
        console.log(data);
       

        // this.WooCommerce.postAsync("orders", orderData).then((response) => {
        //   console.log(response);});

          this.WooCommerce.postAsync("orders", orderData).then((data) => {
            console.log(data);
          // console.log(JSON.parse(data.body).order);

          if(data.error){
            
            this.alertCtrl.create({
              title: "Error",
              message: "could not complete your order. Please Try again",
              buttons: ['okay']
            });
            loading.dismiss();
          } else {
          

          this.orderDetails = JSON.parse(data.body).order;
         console.log(this.orderDetails);

         loading.dismiss();

         this.alertCtrl.create({
          title: "Success!!", 
          message: "You have successfully placed your order number {{orderDetails.id}} ",
          buttons: [
            {text: 'Okay',
            handler: () => {
              this.viewCtrl.dismiss();
              
            } }]
  
        }).present();

        this.navCtrl.push(OrderPlacedPage, {"order": this.orderDetails});



        }
        });
      });
      // this.navCtrl.push(OrderPlacedPage);
    }


  }

  // placeOrder(){
  //    //test
  //   //  loading.dismiss();
    
  //    this.viewCtrl.dismiss();
  //   if(this.paymentData.method_id = "easypay"){
  //     this.navCtrl.push(MpesaPage, {"order": this.newOrder});
  //   } else {
  //     this.navCtrl.push(OrderPlacedPage, {"order": this.newOrder});
  //   }

     
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CheckoutPage');
  // }
  close(){
    this.viewCtrl.dismiss();
  }

}
