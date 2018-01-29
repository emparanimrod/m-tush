import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from "@ionic/storage";
import { CartPage } from '../cart/cart'
import { WC_URL } from '../../models/appconfig';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController ) {

    this.product = this.navParams.get('product');
    console.log(this.product)

    this.WooCommerce = WC(WC_URL);

    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data)=>{

      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);

    }, (err) => {
      console.log(err);
    });
    
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ProductDetailsPage');
  // }
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

  buyNow(product){
    
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

            this.modalCtrl.create(CartPage).present();
    
          })
    
        })
      }
openCart(){
     this.modalCtrl.create(CartPage).present();
   }

   goHome(){
    this.navCtrl.popToRoot();
  }

addToWishlist(product){
  this.storage.get("wishlist").then((data)=> {
    console.log('wishlist',data);

 if(data == null || data.length == 0){

      data = [];

      data.push({
        "product": product,
        "amount": product.price
      });
     } else {

       let added = 0;

      for(let i = 0; i < data.length; i++){
         if(product.id == data[i].product){
          console.log("Product is already in the wishlist");
          this.toastCtrl.create({
            message: "The product is already in your wishlist",
            duration: 3000
          }).present();

        }
      }
      if(added == 0){
        data.push({
          "product": product,
          // "amount": parseFloat(product.price)
        });
      }
    }

    this.storage.set("wishlist", data).then( ()=>{

      console.log("Wishlist has been updated");
      console.log(data);

      this.toastCtrl.create({
        message: "Your Wishlist has been updated",
        duration: 3000
      }).present();

    });

  });
}

toggleWishList(item){

   }
}
