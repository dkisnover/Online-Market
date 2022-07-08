import { HttpClient } from "@angular/common/http";
import { identifierName } from "@angular/compiler";
import { temporaryAllocator } from "@angular/compiler/src/render3/view/util";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Item } from "./item.model";
@Injectable()
export class InventoryService{
    constructor(private http: HttpClient){}
    private inventoryItems: Item[] = [];
    /*private inventoryProducts: Product[] = [
        new Product('Ethernet cable',false, 20, 0, false, 12),
        new Product('Headset',false, 80, 0, false, 2),
        new Product('Imported Monitor',true, 200, 0, false, 5),
    ];*/
    
    getItems(){
        return this.fetchInventory();
    }

    getItem(index: number): Item{
        return this.inventoryItems[index];
    }
    
    getNextID(){
        return this.inventoryItems.length;
    }

    setItems(items: Item[]){
        if(items){
            this.inventoryItems = items;
            this.storeInventory();
        }
    }

    addItem(newItem: Item){
        if(this.inventoryItems){
           let index = this.inventoryItems.findIndex(x => x.name.toLowerCase === newItem.name.toLowerCase && x.tax + x.unadjustedPrice === newItem.tax + newItem.unadjustedPrice);
            if(index > -1){
                this.inventoryItems[index].stock += newItem.stock;
                this.adjustPrice(this.inventoryItems[index]);
            }else{
                this.inventoryItems.push(newItem);  
            }
            console.log(this.inventoryItems); 
        }else{
            this.inventoryItems = [newItem];
        }
        this.storeInventory();
        
    }

    removeItem(index: number){
        if(this.inventoryItems.length === 1){
            this.inventoryItems.pop();
        }else{
            this.inventoryItems.splice(index, 1)
        }
        this.storeInventory();
    }

    removeStock(bought: number, index){
        this.inventoryItems[index].stock -= bought;
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

    storeInventory(){
        this.http.put('https://online-store-9bdde-default-rtdb.firebaseio.com/inventory.json', this.inventoryItems).subscribe(response =>{
            console.log(response);
        })
    }

    fetchInventory(): Observable<Item[]>{
        let temp;
        console.log('fetch inventory hit')
        return this.http.get<Item[]>('https://online-store-9bdde-default-rtdb.firebaseio.com/inventory.json')
            .pipe(map(items => items ? this.inventoryItems = items : this.inventoryItems = []));
    }

}