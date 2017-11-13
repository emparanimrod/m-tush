import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { Http } from '@angular/http';

@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {

  WooCommerce: any;
  user: any = {};
  username: any;
  password: any;
  email: any;
  id: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public storage: Storage,
              public toastCtrl: ToastController,
              public http: Http) {
                this.password = "";

                this.storage.get("userLoginInfo").then( (userLoginInfo) => {
                  this.username = userLoginInfo.user.username;
                  this.email = userLoginInfo.user.email 
                  console.log(userLoginInfo);
                  this.id = userLoginInfo.user.id;
                });

    
  }

  resetPassword(){

   
    let customerData= {
      customer: {}
    }

      customerData.customer = {
        "password": this.user.newPassword,

      } 
      
      if(this.user.newPassword == this.user.confirmNewPassword){
      console.log('password matched');
      this.http.get("https://cloud.edgetech.co.ke/m-tush/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.user.password)
      .subscribe( (res) => {
        console.log(res.json());

        let response = res.json();

        if(response.error){
          this.toastCtrl.create({
            message: response.error,
            duration: 4000
  
          }).present();
          return;
        } else {
          if (this.user.password == this.user.newPassword){

            console.log(" new password and old password are the same");
            this.alertCtrl.create({
              title: "Error!!", 
              message: "New Password and Old password are the same. Please Try Again",
              buttons: ['Close']
      
            }).present();
          } else {
              this.WooCommerce.put("customers/2", customerData.customer).then((data) => {
        
                console.log(JSON.parse(data.body).order);
        
        
                });
          }
        }
      });
      
    } else {
      console.log('password not matching');
      this.alertCtrl.create({
        title: "Error!!", 
        message: "The New Passwords you entered do not match. Please Try Again",
        buttons: ['Close']

      }).present();
      
    }

    //   this.WooCommerce.put("customers", customerData).then((data) => {
        
    //               console.log(JSON.parse(data.body).order);
        
        
    //             })
    }

}


