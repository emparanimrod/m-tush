import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from "@ionic/storage";
import { BillingInfoPage } from '../billing-info/billing-info';
import { EditPasswordPage } from '../edit-password/edit-password';
import { WC_URL } from '../../models/appconfig';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  WooCommerce: any; 
  userInfo: any;
  profileInfo: any;
  user: any;
  loggedIn: boolean;
  
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public storage: Storage,
              public actionCtrl: ActionSheetController,
              public loadingCtrl: LoadingController ) {

                this.user = {};
                

                this.WooCommerce = WC(WC_URL);

    this.profileInfo = {};
    this.profileInfo.billing_address = {};
    this.profileInfo.shipping_address = {};

    this.storage.get("userLoginInfo").then( (userLoginInfo) => {
      
      
            let email = userLoginInfo.user.email; 

            let loading = this.loadingCtrl.create({
              spinner: 'bubbles',
              showBackdrop: false,
              cssClass: 'backdrop'
              });
          loading.present();
      
            this.WooCommerce.getAsync("customers/email/"+email).then( (data) => {

              
              
              this.profileInfo = JSON.parse(data.body).customer;
              console.log(JSON.parse(data.body));

              loading.dismiss();
            });
            
      
          })
    
  }

  ionViewDidEnter() {
    
    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) =>{

        if(userLoginInfo != null){

          console.log("user logged in");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;

        } else {

          console.log("No user is logged in");
          this.user = {};
          this.loggedIn = false;
        }

      } )
    });


  }

  billingInfo(){

    this.navCtrl.push(BillingInfoPage);
  }

  reload(){
    console.log("loading")
  }

  editProfile(){
    const actionSheet = this.actionCtrl.create({

      title: 'Edit your Profile',
      buttons: [
        {
          text: 'Change Password',
          icon: 'lock',
          cssClass: 'strong',
          handler: () => {
            console.log('Change Password');
            this.navCtrl.push(EditPasswordPage);
          }
        },
        {
          text: 'Edit Your Basic Profile Info',
          icon: 'person',
          handler: () => {
            console.log('Edit basic info');
          }
        },

        {
          text: 'Edit Billing Info',
          icon: 'card',
          handler: () => {
            console.log('billing');
          }
        },

        {
          text: 'Edit Shipping Info',
          icon: 'plane',
          handler: () => {
            console.log('shipping');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();

    
  }

  goHome(){
    this.navCtrl.popToRoot();
  }

}
