import { Component } from '@angular/core';
import { NavController,  ToastController, ModalController, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductDetailsPage } from '../product-details/product-details';
import { CartPage } from '../cart/cart';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { CategoriesPage } from '../categories/categories';
// import { WC_URL } from "../../models/appconfig";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // list slides for slider
  public slides = [
    {
      src: 'assets/img/slide_1.jpg'
    },
    {
      src: 'assets/img/slide_2.jpg'
    },
    {
      src: 'assets/img/slide_3.jpg'
    }
  ];

  //constants

 WooCommerce: any; 
  products: any[];
  page: number;
  moreProducts: any[];
  categories: any[];
  discount: any;
  
 
  // @ViewChild('productslides') productSlides: Slides;
  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController ) {

                this.categories = [];
                  this.page = 2;

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

    

    this.loadMoreProducts(null);
    
   this.WooCommerce.getAsync('products').then( (data) => {
    console.log(JSON.parse(data.body));
    this.products = JSON.parse(data.body).products;
   }, (err) =>{
    console.log(err)
   });

   let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    showBackdrop: false,
    cssClass: 'backdrop',
    

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

  }, (err) => {
    console.log(err)
  });
  
  
  }

  
  ionViewDidLoad(){
  //  setInterval(()=> {
  //   if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
  //     this.productSlides.slideTo(0);

  //   this.productSlides.slideNext();
  //  }, 3000)
  };
  loadMoreProducts(event){

    if(event == null)
      {
        this.page = 1;
      this.moreProducts = [];
    }
      else
      this.page++;

    this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);
      if(event != null){
        event.complete();
      }

      if(JSON.parse(data.body).products.length <10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more Products to show!",
          duration: 2500
        }).present();
      }

     }, (err) =>{
      console.log(err)
     })
 
    //  categories
     this.WooCommerce.getAsync('products/categories').then((data) =>{
      console.log(JSON.parse(data.body).product_categories);
  
      let temp: any[] = JSON.parse(data.body).product_categories;
  
      for( let i = 0; i < temp.length; i ++ ){
        if(temp[i].parent == 0){
          this.categories.push(temp[i]);
        }
      }
  
    }, (err) => {
      console.log(err)
    })

  }
  openCart(){
    this.modalCtrl.create(CartPage).present();
  }
  
  openProductPage(product){

    this.navCtrl.push(ProductDetailsPage, {"product": product})
  }

  openCategoryPage(category){
    
        this.navCtrl.push(ProductsByCategoryPage, {'category': category});
    
      }
      viewCategories(){

        this.navCtrl.push(CategoriesPage);

      }

}
