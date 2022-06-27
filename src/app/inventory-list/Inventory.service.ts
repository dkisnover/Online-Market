import { Injectable } from "@angular/core";
import { Product } from "../product.model";

@Injectable()
export class InventoryService{
    private inventoryProducts: Product[] = [
        new Product('Ethernet cable',false, 1, 20),
        new Product('Headset',false, 2, 80),
        new Product('Imported Monitor',true, 3, 200),
    ];
    
    getProducts(){
        return this.inventoryProducts.slice();
    }

    getProduct(index: number){
        return this.inventoryProducts[index];
    }


}