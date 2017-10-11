import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {

  WooCommerce: any;
  user: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {


    
  }

  resetPassword(){
    let customerData= {
      customer: {}
    }

      customerData.customer = {
        "password": this.user.password,

      }

      this.WooCommerce.postAsync("customers", customerData).then((data) => {
        
                  console.log(JSON.parse(data.body).order);
        
        
                })
    }

}


