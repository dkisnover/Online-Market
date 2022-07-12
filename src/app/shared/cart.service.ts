import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as dayjs from "dayjs";
import { map, Observable } from "rxjs";
import { InventoryService } from "./Inventory.service";
import { Item } from "./item.model";
import { Receipt } from "./receipt.model";

/*
Author: Declan Kelly
Cart service is an injectable service for the purpose of managing the cart's process as well as providing the inventory
from the backend and making it accessible to components that need it
*/
@Injectable()
export class CartService{
    constructor(private http: HttpClient, private inventoryService: InventoryService){}
    private cartItems: Item[] = []

    /*
    return: number
        sums the adjusted prices of the items in the cart and returns
    */
    getTotalPrice(){
        var price = 0;
        for(var item of this.cartItems){
            price += item.totalPrice;
        }
        return price;
    }

    /*
    return: number
        sums total tax values and returns it as a number
    */
    getTotalTax(){
        var price = 0;
        for(var item of this.cartItems){
            price += item.totalTax;
        }
        return price;
    }

    /*
    params: newItem: Item
        adds the item to the cart, then saves it to the backend.
        First checks if the cart is populated, if not adds it into a new empty array
        then checks if it is identical to other items in the cart, if it is then merges it into a prexisting entry
    */
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
        this.storeCart();


    }

    /*
        clears the entire array, ensuring last is popped to protect from erroneous display. Saves cart on completion.
    */
    clear(){
        this.cartItems.splice(0, this.cartItems.length-1);
        this.cartItems.pop();
        this.storeCart();
    }

    /*
    params: index: number
        removes item from array, saves information
    */
    remove(index: number){
        let item: Item = this.cartItems[index];
        item.stock = item.quantity;
        item.quantity = 0;
        this.cartItems.splice(index, 1);
        this.storeCart();
        this.inventoryService.restoreInventory(item);
    }
    /*
    params: item: Item
        uses tax information to create a price with taxes. Also rounds to .05. Doesn't return because directly edits item.
    */
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
        if(item.exempt == true){
            item.tax = 0;
            item.totalTax = 0;
        }
    }

    /*
    return: Receipt
        creates and returns a new Receipt of the data in the cart. dayjs used to give it current date
    */
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
    
    /*
    stores information in cartItems in http backend
    */
    storeCart(){
        this.http.put('https://online-store-9bdde-default-rtdb.firebaseio.com/cart.json', this.cartItems).subscribe(response =>{
        })
    }

    /*
    return: Observable<Item[]>
        gets information from backend, saves it into cartItems then passes observable to component from usage. If http backend is empty
        assigns empty array to cartItems.
    */
    fetchCart(): Observable<Item[]>{
        return this.http.get<Item[]>('https://online-store-9bdde-default-rtdb.firebaseio.com/cart.json')
            .pipe(map(items => items ? this.cartItems = items : this.cartItems = []));
    }



}