import { Injectable } from "@angular/core";
import { Product } from "../product.model";

@Injectable()
export class CartService{
    private cartProducts: Product[] = [
        new Product('Ethernet cable',false, 1, 20, 3),
        new Product('Headset',false, 2, 80, 6),
        new Product('Imported Monitor',true, 3, 34, 9),
    ];

    getProducts(){
        return this.cartProducts.slice();
    }
    getProduct(index: number){
        return this.cartProducts[index];
    }


}