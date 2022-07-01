import { Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable()
export class CartService{
    private cartProducts: Product[] = [
        new Product('Ethernet cable',false, 20, 3, false),
        new Product('Headset',false, 80, 6, false),
        new Product('Imported Monitor',true, 34, 9, false),
    ];

    getProducts(){
        return this.cartProducts.slice();
    }
    getProduct(index: number){
        return this.cartProducts[index];
    }
    getTotalPrice(){
        var price = 0;
        for(var product of this.cartProducts){
            price += product.totalPrice;
        }
        return price;
    }

    getTotalTax(){
        var price = 0;
        for(var product of this.cartProducts){
            price += product.totalTax;
        }
        return price;
    }
    addProduct(newProduct: Product){
        newProduct.adjustPrice();
        if(this.cartProducts.length === 0 ){
            this.cartProducts =[
                newProduct
            ];
        }else{
            let index = this.cartProducts.findIndex(x => x.name.toLowerCase === newProduct.name.toLowerCase && x.tax + x.unadjustedPrice === newProduct.tax + newProduct.unadjustedPrice);
            if(index > -1){
                this.cartProducts[index].quantity += newProduct.quantity;
                this.cartProducts[index].adjustPrice();
            }else{
                this.cartProducts.push(newProduct);  
            }
        }

    }

    clear(){
        this.cartProducts = [];
    }

    remove(index: number){
        this.cartProducts.splice(index, 1);
    }


}