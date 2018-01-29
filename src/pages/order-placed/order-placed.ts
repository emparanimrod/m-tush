import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderPlacedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-order-placed',
  templateUrl: 'order-placed.html',
})
export class OrderPlacedPage {

  order: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.order = this.navParams.get("order");
    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrderPlacedPage');
    console.log(this.order);
  }

}
