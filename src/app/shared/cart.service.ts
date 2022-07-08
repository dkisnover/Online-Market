import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as dayjs from "dayjs";
import { map, Observable } from "rxjs";
import { Item } from "./item.model";
import { Receipt } from "./receipt.model";

@Injectable()
export class CartService{
    constructor(private http: HttpClient){}
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
    addItem(newItem: Item){
        this.adjustPrice(newItem);
        if(this.cartItems.length === 0 ){
            this.cartItems =[
                newItem
            ];
        }else{
            let index = this.cartItems.findIndex(x => x.name.toLowerCase === newItem.name.toLowerCase && x.tax + x.unadjustedPrice === newItem.tax + newItem.unadjustedPrice);
            if(index > -1){
                this.cartItems[index].quantity += newItem.quantity;
                this.adjustPrice(this.cartItems[index]);
            }else{
                this.cartItems.push(newItem);  
            }
        }
        this.storeInventory();


    }

    clear(){
        this.cartItems.splice(0, this.cartItems.length-1);
        this.cartItems.pop();
        this.storeInventory();
    }

    remove(index: number){
        this.cartItems.splice(index, 1);
        this.storeInventory();
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

    storeInventory(){
        this.http.put('https://online-store-9bdde-default-rtdb.firebaseio.com/cart.json', this.cartItems).subscribe(response =>{
            console.log(response);
        })
    }

    fetchInventory(): Observable<Item[]>{
        return this.http.get<Item[]>('https://online-store-9bdde-default-rtdb.firebaseio.com/cart.json')
            .pipe(map(items => items ? this.cartItems = items : this.cartItems = []));
    }



}