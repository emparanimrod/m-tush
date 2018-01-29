import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import * as WC from 'woocommerce-api';
import { WC_URL } from '../../models/appconfig'

/**
 * Generated class for the AddressesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addresses',
  templateUrl: 'addresses.html',
})
export class AddressesPage {

  WooCommerce: any; 
  profileInfo: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public storage: Storage,
              public loadingCtrl: LoadingController) {

                this.WooCommerce = WC(WC_URL);

                this.storage.get("userLoginInfo").then( (userLoginInfo) => {

                        let email = userLoginInfo.user.email; 
            
                        let loading = this.loadingCtrl.create({
                          spinner: 'bubbles',
                          showBackdrop: false,
                          cssClass: 'backdrop' });
                          loading.present();
                  
                        this.WooCommerce.getAsync("customers/email/"+email).then( (data) => {
                          this.profileInfo = JSON.parse(data.body).customer;
                          console.log(JSON.parse(data.body));
            
                          loading.dismiss();
                        });
                        
                  
                      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressesPage');
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


}
