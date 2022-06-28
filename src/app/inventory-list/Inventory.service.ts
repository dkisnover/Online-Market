import { Injectable } from "@angular/core";
import { Product } from "../product.model";

@Injectable()
export class InventoryService{
    private inventoryProducts: Product[] = [
        new Product('Ethernet cable',false, 1, 20, 0, false),
        new Product('Headset',false, 2, 80, 0, false),
        new Product('Imported Monitor',true, 3, 200, 0, false),
    ];
    
    getProducts(){
        return this.inventoryProducts.slice();
    }

    getProduct(index: number){
        return this.inventoryProducts[index];
    }
    
    getNextID(){
        return this.inventoryProducts.length;
    }

    addProduct(product: Product){
        this.inventoryProducts.push(product);
        console.log("nice");
    }


}