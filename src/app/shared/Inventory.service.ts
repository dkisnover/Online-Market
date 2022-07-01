import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product } from "./product.model";

@Injectable()
export class InventoryService{
    private inventoryProducts: Product[] = [
        new Product('Ethernet cable',false, 20, 0, false, 12),
        new Product('Headset',false, 80, 0, false, 2),
        new Product('Imported Monitor',true, 200, 0, false, 5),
    ];
    
    getProducts(){
        return this.inventoryProducts.slice();
    }

    getProduct(index: number): Product{
        return this.inventoryProducts[index];
    }
    
    getNextID(){
        return this.inventoryProducts.length;
    }

    addProduct(newProduct: Product){
        let index = this.inventoryProducts.findIndex(x => x.name.toLowerCase === newProduct.name.toLowerCase && x.tax + x.unadjustedPrice === newProduct.tax + newProduct.unadjustedPrice);
        if(index > -1){
            this.inventoryProducts[index].stock += newProduct.stock;
            this.inventoryProducts[index].adjustPrice();
        }else{
            this.inventoryProducts.push(newProduct);  
        }
        //this.products$.next(this.inventoryProducts.slice())
    }

    removeProduct(index: number){
        this.inventoryProducts.splice(index, 1);
    }

    removeStock(bought: number, index){
        this.inventoryProducts[index].stock -= bought;
    }


}