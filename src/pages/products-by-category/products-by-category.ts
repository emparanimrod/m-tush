import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { CartPage } from '../cart/cart';
import { Storage } from "@ionic/storage";
import { ProductDetailsPage } from '../product-details/product-details';
import { WC_URL } from '../../models/appconfig';


@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  // view type
  public viewType = 'list';
  
  WooCommerce: any;
  products: any[];
  page: number;
  category: any;
  moreProducts: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController,
              public storage: Storage,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController ) {

    this.page = 1;
    this.category = this.navParams.get("category");
    
    
    this.WooCommerce = WC(WC_URL);

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: false,
      cssClass: 'backdrop'
      });
  loading.present();

    this.WooCommerce.getAsync("products?filter[category]="+ this.category.name).then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;

      loading.dismiss();
     }, (err) =>{
      console.log(err);

     });
    
    }
  
  viewList() {
    this.viewType = 'list';
  }

  // swith to grid view
  viewGrid() {
    this.viewType = 'grid';
  }

  openProductPage(product){
    
        this.navCtrl.push(ProductDetailsPage, {"product": product});

      }

   addToCart(product){

    this.storage.get("cart").then((data)=> {
      // console.log(data);
      //cart module
      if(data == null || data.length == 0){

        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        });
      } else {

        let added = 0;

        for(let i = 0; i < data.length; i++){
          if(product.id == data[i].product.id){
            console.log("Product is already in the cart");

            let qty = data[i].qty;

            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }
        if(added == 0){
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          });
        }
      }

      this.storage.set("cart", data).then( ()=>{

        console.log("cart updated");
        console.log(data);

        this.toastCtrl.create({
          message: "Your Cart has been Updated",
          duration: 1000
        }).present();

      })

    })
  }
    
  openCart(){
    this.modalCtrl.create(CartPage).present();
  }
  goHome(){
    this.navCtrl.popToRoot();
  }

}
