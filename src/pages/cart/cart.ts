import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { CheckoutPage } from '../checkout/checkout';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean = false;
  


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public storage: Storage,
              public viewCtrl: ViewController ) {

                this.total = 0.00;

                this.storage.ready().then(()=>{

                  this.storage.get("cart").then( (data)=>{
                    this.cartItems = data;
                    console.log(this.cartItems);

                    if(this.cartItems.length > 0){
                      this.cartItems.forEach( (item, index)=>{
                        this.total = this.total + (item.product.price * item.qty)
                      });
                      console.log(data);
                    } else {

                      this.showEmptyCartMessage = true;

                    }

                  })


                })

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CartPage');
  // }
  removeFromCart(item, i){

    let price = item.product.price;
    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( () => {

      this.total = this.total - (price * qty);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }

  }

  //add product quantity

  addQuantity(item, i){
    let price = item.product.price;
    let qty = item.qty;
    
    this.storage.get("cart").then((data)=> {
      
           data[i].qty = qty+1;
     
        //    if( item.qty == 0){
             
        //        this.cartItems.splice(i.qty, 1);
                     
        //            }
     
        //  item.qty = qty;
        //  console.log(item.qty);
         });

    
    this.storage.set("cart", this.cartItems).then( () => {
      
            this.total = this.total + (price * qty);
            console.log(item);
      
          });
  }

  reduceQuantity(item, i){
    // let price = item.product.price;
    // let qty = item.qty;






    // this.storage.get("cart").then((data)=> {

     
    //   data[i].qty = qty-1;

    //   if( item.qty == 0){
        
    //       this.cartItems.splice(i, 1);
                
    //           }

    // item.qty = qty;
    // console.log(item.qty);
    // });

    // this.storage.set("cart", this.cartItems).then( () => {
      
    //         this.total = this.total - (price * qty);
      
    //       });
  

    
  }

  checkout(){

    this.storage.get("userLoginInfo").then( (data) => {
      if (data != null){
        this.navCtrl.push(CheckoutPage)
      } else {
        this.navCtrl.push(LoginPage, {next: CheckoutPage})
      }
    } )

    
  }

closeModal(){

this.viewCtrl.dismiss();

}

}
