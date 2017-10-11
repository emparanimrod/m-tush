import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  WooCommerce: any;
  categories: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController) {

    this.categories = [];

    //woocommerce credentials
    this.WooCommerce = WC({
      url: 'https://cloud.edgetech.co.ke/m-tush',
      consumerKey: 'ck_3106173da4bf0f0269cd58e8be438139dc515b87',
      consumerSecret: 'cs_ee6a004c51a4206d4d9a374b1b05adac24927f53',
      version: 'v3',
      // wpAPI: false,
      // version: 'wc/v1',
      verifySsl: false,
      queryStringAuth: true
    });

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'backdrop'
      });
  loading.present();

    this.WooCommerce.getAsync('products/categories').then((data) =>{
      console.log(JSON.parse(data.body).product_categories);
      let temp: any[] = JSON.parse(data.body).product_categories;
  
      for( let i = 0; i < temp.length; i ++ ){
        if(temp[i].parent == 0){
          this.categories.push(temp[i]);

          loading.dismiss();
  
        }
      }
    
  })

}

  openCategoryPage(category){


    
        this.navCtrl.push(ProductsByCategoryPage, {'category': category});
    
      }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');

      
  }

}
