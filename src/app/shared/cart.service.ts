import { Injectable } from "@angular/core";
import * as dayjs from "dayjs";
import { Item } from "./item.model";
import { Product } from "./product.model";
import { Receipt } from "./receipt.model";

@Injectable()
export class CartService{
    private cartItems: Item[] = []
    
    /*private cartProducts: Product[] = [
        new Product('Ethernet cable',false, 20, 3, false),
        new Product('Headset',false, 80, 6, false),
        new Product('Imported Monitor',true, 34, 9, false),
    ];*/

    getProducts(){
        return this.cartItems.slice();
    }
    getProduct(index: number){
        return this.cartItems[index];
    }
    getTotalPrice(){
        var price = 0;
        for(var product of this.cartItems){
            price += product.totalPrice;
        }
        return price;
    }

    getTotalTax(){
        var price = 0;
        for(var product of this.cartItems){
            price += product.totalTax;
        }
        return price;
    }
    addProduct(newProduct: Product){
        newProduct.adjustPrice();
        if(this.cartItems.length === 0 ){
            this.cartItems =[
                newProduct
            ];
        }else{
            let index = this.cartItems.findIndex(x => x.name.toLowerCase === newProduct.name.toLowerCase && x.tax + x.unadjustedPrice === newProduct.tax + newProduct.unadjustedPrice);
            if(index > -1){
                this.cartItems[index].quantity += newProduct.quantity;
                this.adjustPrice(this.cartItems[index]);
            }else{
                this.cartItems.push(newProduct);  
            }
        }

    }

    clear(){
        this.cartItems = [];
    }

    remove(index: number){
        this.cartItems.splice(index, 1);
    }

    adjustPrice(item: Item){
        if(item.imported === true){
            item.adjustedPrice = 1.15 * item.unadjustedPrice;
        }else{
            item.adjustedPrice = item.exempt ? item.unadjustedPrice : item.unadjustedPrice * 1.1;
        }
        item.adjustedPrice *= 100;
        item.adjustedPrice = Math.round(item.adjustedPrice / 5) * 5
        item.adjustedPrice /=100;
        item.tax = item.adjustedPrice - item.unadjustedPrice;
        item.totalPrice = Math.round(item.adjustedPrice * item.quantity * 100)/100
        item.totalTax = item.tax * item.quantity;
    }

    createReceipt(): Receipt{
        let now = dayjs();
        return {
            purchases: this.cartItems,
            totalCost: this.getTotalPrice(),
            purchaseDate: new Date(now.year(),now.month() + 1, now.date()),
            totalTaxes: this.getTotalTax(),
            totalTaxless: this.getTotalPrice() - this.getTotalTax()

        }
    }


}