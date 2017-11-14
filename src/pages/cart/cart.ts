import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
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
  // showEmptyCartMessage: boolean = false;
  


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public storage: Storage,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController ) {

                this.total = 0.00;

                this.storage.ready().then(()=>{

                  this.storage.get("cart").then( (data)=>{
                    this.cartItems = data;
                    console.log(this.cartItems);

                     if(this.cartItems ){
                      this.cartItems.forEach( (item, index)=>{
                        this.total = this.total + (item.product.price * item.qty)
                      });
                      console.log(data);
                     } else {

                      console.log(Error);

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
      // this.showEmptyCartMessage = true;

      this.total = 0;
    }

  }

  //add product quantity

  addQuantity(item, i){
    

    this.storage.set("cart", this.cartItems).then( () => {
      
      item.qty = item.qty + 1;

      this.total = this.total + (item.product.price*1);

      
          });
  }

  reduceQuantity(item, i){
    
     if(item.qty > 1) {item.qty = item.qty - 1;
    
        this.storage.set("cart", this.cartItems).then( () => {
          
          this.total = this.total - (item.product.price*1);
          
              });} else {


                this.alertCtrl.create({
                  title: "Sorry", 
                  message: "You cannot reduce the product quantity further. Would you like to remove the item from your Cart?",
                  buttons: [{
                    text: 'Yes, Please',
                    handler: () => {
                      console.log('Disagree clicked');
                      this.cartItems.splice(i, 1);
                      
                          this.storage.set("cart", this.cartItems).then( () => {
                      
                            this.total = this.total - (item.product.price * item.qty);
                      
                          });
                    }
                  },
                  {
                    text: 'No, Thank You',
                    handler: () => {
                      console.log("Not removed")
                    }
                  }]
        
                }).present();
    
  }
}


  checkout(){

    this.storage.get("userLoginInfo").then( (data) => {
      if (data != null){
        this.viewCtrl.dismiss();
        this.navCtrl.push(CheckoutPage);
      } else {
        this.viewCtrl.dismiss();
        this.navCtrl.push(LoginPage, {next: CheckoutPage});
      }
    } )

    
  }

closeModal(){

this.viewCtrl.dismiss();

}


  



}
