import { HttpClient } from "@angular/common/http";
import { TextAttribute } from "@angular/compiler/src/render3/r3_ast";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Item } from "./item.model";

/*
Author: Declan Kelly
Inventory service is an injectable service for the purpose of managing the inventory's process as well as providing the inventory
from the backend and making it accessible to components that need it
*/
@Injectable()
export class InventoryService{
    constructor(private http: HttpClient){}
    private inventoryItems: Item[] = [];
    
    /*
    params: index
    return: Item
        index taken, returns that index from
    */
    getItem(index: number): Item{
        return this.inventoryItems[index];
    }

     /*
    params: newItem: Item
        changes name to be first letter capitalized
        ensures the array exists, if not add as first element
        checks if item has an item with shared name and price, if identical merges the stock
    */
    addItem(newItem: Item){
        newItem.name = newItem.name.toLowerCase();
        newItem.name = newItem.name.charAt(0).toUpperCase() + newItem.name.slice(1);
        if(this.inventoryItems){
           let index = this.inventoryItems.findIndex(x => x.name.toLowerCase === newItem.name.toLowerCase && x.tax + x.unadjustedPrice === newItem.tax + newItem.unadjustedPrice);
            if(index > -1){
                this.inventoryItems[index].stock += newItem.stock;
                this.adjustPrice(this.inventoryItems[index]);
            }else{
                this.inventoryItems.push(newItem);  
            }
        }else{
            this.inventoryItems = [newItem];
        }
        this.storeInventory();
        
    }
     /*
    params: index: number
        removes instance from array, then saves to backend. If there is only one element, uses pop to prevent error in display
    */
    removeItem(index: number){
        if(this.inventoryItems.length === 1){
            this.inventoryItems.pop();
        }else{
            this.inventoryItems.splice(index, 1)
        }
        this.storeInventory();
    }
     /*
    params: bought: number, index: number
        removes amount bought from associated item's stock, then saves data.
    */
    removeStock(bought: number, index){
        this.inventoryItems[index].stock -= bought;
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
    stores active inventory into backend
    */
    storeInventory(){
        this.http.put('https://online-store-9bdde-default-rtdb.firebaseio.com/inventory.json', this.inventoryItems).subscribe(response =>{
        })
    }
     /*
    return: Observable<Item[]>
        takes information backend and assigns it to the array in this service. In addition, returns an observable that can be used to track that 
        information. If there is no instance of this information in the backend, then it assigns a null array.
    */
    fetchInventory(): Observable<Item[]>{
        let temp;
        return this.http.get<Item[]>('https://online-store-9bdde-default-rtdb.firebaseio.com/inventory.json')
            .pipe(map(items => items ? this.inventoryItems = items : this.inventoryItems = []));
    }

}