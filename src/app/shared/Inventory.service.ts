import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Item } from "./item.model";
@Injectable()
export class InventoryService{
    private inventoryItems: Item[] = [];
    /*private inventoryProducts: Product[] = [
        new Product('Ethernet cable',false, 20, 0, false, 12),
        new Product('Headset',false, 80, 0, false, 2),
        new Product('Imported Monitor',true, 200, 0, false, 5),
    ];*/
    
    getItems(){
        return this.inventoryItems.slice();
    }

    getItem(index: number): Item{
        return this.inventoryItems[index];
    }
    
    getNextID(){
        return this.inventoryItems.length;
    }

    addItem(newItem: Item){
        let index = this.inventoryItems.findIndex(x => x.name.toLowerCase === newItem.name.toLowerCase && x.tax + x.unadjustedPrice === newItem.tax + newItem.unadjustedPrice);
        if(index > -1){
            this.inventoryItems[index].stock += newItem.stock;
            this.adjustPrice(this.inventoryItems[index]);
        }else{
            this.inventoryItems.push(newItem);  
        }
        //this.products$.next(this.inventoryProducts.slice())
    }

    removeItem(index: number){
        this.inventoryItems.splice(index, 1);
    }

    removeStock(bought: number, index){
        this.inventoryItems[index].stock -= bought;
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


}