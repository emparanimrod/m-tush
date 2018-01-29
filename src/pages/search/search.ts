import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { WC_URL } from '../../models/appconfig';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ProductDetailsPage } from '../product-details/product-details';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

    // view type
  public viewType = 'list';

  searchQuery : string = ""
  WooCommerce: any;
  products: any[] = [];
  page: number = 2;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController  ) {

    this.WooCommerce = WC(WC_URL);

    console.log(this.navParams.get("searchQuery"));
    this.searchQuery = this.navParams.get("searchQuery");

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'backdrop',
     
      });
      loading.present();

    //search code

    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery).then((searchData) => {
      this.products = JSON.parse(searchData.body).products;
      console.log("search results", this.products);

      loading.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  viewList() {
    this.viewType = 'list';
  }

  // swith to grid view
  viewGrid() {
    this.viewType = 'grid';
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product})
  }
  loadMoreProducts(event){

    
    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery + "&page=" + this.page).then((searchData) => {
      this.products = this.products.concat(JSON.parse(searchData.body).products);
      console.log("search results", this.products);
      if(JSON.parse(searchData.body).products.length <10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more Products to show!",
          duration: 2500
        }).present();
      }
     
      event.complete();
      this.page ++;

    })
  }
}
