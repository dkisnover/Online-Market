import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Product } from "../shared/product.model";

@Injectable()
export class InventoryService{
    private inventoryProducts: Product[] = [
        new Product('Ethernet cable',false, 1, 20, 0, false),
        new Product('Headset',false, 2, 80, 0, false),
        new Product('Imported Monitor',true, 3, 200, 0, false),
    ];
    private products$: Observable<Product[]> = of(this.inventoryProducts.slice());
    
    getProducts(){
        return this.products$;
    }

    getProduct(index: number){
        return this.inventoryProducts[index];
    }
    
    getNextID(){
        return this.inventoryProducts.length;
    }

    addProduct(product: Product){
        this.inventoryProducts.push(product);
        this.products$ = of(this.inventoryProducts.slice());
        //this.products$.next(this.inventoryProducts.slice())
        console.log("nice");
    }


}