import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Menu } from '../menu/menu';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: Http,
              public toastCtrl: ToastController,
              public storage: Storage,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController ) {

                this.username = "";
                this.password = "";

  }

  login(){

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'backdrop'
      });
  loading.present();

    // ?insecure=cool
    this.http.get("https://cloud.edgetech.co.ke/m-tush/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
    .subscribe( (res) => {
      console.log(res.json());

      let response = res.json();

      if(response.error){
        this.toastCtrl.create({
          message: response.error,
          duration: 4000

        }).present();

        loading.dismiss();
        
        return;
      }

      this.storage.set("userLoginInfo", response).then( (data) => {

        loading.dismiss();

        this.alertCtrl.create({
          title: "Success!!", 
          message: "You have been Successfully Logged In",
          buttons: [{
            text: "OK", 
            handler: () => {
              this.navCtrl.setRoot(Menu);
            }
          }]

        }).present();

      })

    })

  }

register(){
  this.navCtrl.push(SignupPage);
}
}
