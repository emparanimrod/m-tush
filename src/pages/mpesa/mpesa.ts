import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { HomePage } from '../home/home';
import { OrderPlacedPage } from '../order-placed/order-placed';

/**
 * Generated class for the MpesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-mpesa',
  templateUrl: 'mpesa.html',
})
export class MpesaPage {

  order: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: Http,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController ) {
    this.order = this.navParams.get("order");

    this.http.post("https://prod.edgetech.co.ke/MtushMpesa/public/api/confirmcode", 
    { order_no: this.order.id,
      total: this.order.total
    }
    ).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
    }; 
    
  

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad MpesaPage');
  // }
  

  confirmPayment(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'backdrop'
      });
  loading.present();
    this.http.post("https://prod.edgetech.co.ke/MtushMpesa/public/api/returnTokenMobile", 
    { orderRefNum: this.order.id,
      amount: this.order.total
    }
    ).subscribe(

      res => {
        
        loading.dismiss();


        console.log(res);
        // console.log('res', JSON.parse(res.text()))
        let orderConfirm = JSON.parse(res.text());
        // console.log(orderData);
        if(orderConfirm.status == 0){
          this.alertCtrl.create({
            title: "Error", 
            message: "Your payment has not been recieved. Kindly try again",
            buttons: ['Okay']
          }).present();

        } if(orderConfirm.status == 1) {
          this.navCtrl.push(OrderPlacedPage, {"order": this.order});
          this.toastCtrl.create({
            message: "Your payment has been recieved",
            duration: 1000
          }).present();
         }
      },
      err => {

        loading.dismiss();

        console.log(err);
      });
    }
  
  cancel(){
    this.navCtrl.popTo(HomePage);
    console.log('popped');
    }
  }
  

// }
