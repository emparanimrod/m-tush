import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { WC_URL } from '../../models/appconfig';


@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  WooCommerce: any;
  categories: any[];
  popularCategories: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController) {

    this.categories = [];
    this.popularCategories = [];

    //woocommerce credentials
    this.WooCommerce = WC(WC_URL);

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
        if(temp[i].count >= 2){
          if(temp[i].image){
          this.popularCategories.push(temp[i]);}

          console.log(this.popularCategories);

        }
      }
    
  })

}

  openCategoryPage(category){


    
        this.navCtrl.push(ProductsByCategoryPage, {'category': category});
    
      }


      goHome(){
        this.navCtrl.popToRoot();
      }
    

}
