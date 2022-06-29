import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { Receipt } from "./receipt.model";

@Injectable()
export class ReceiptService {
    private products: Product[] = [
        new Product('Ethernet cable',false, 20, 3, false),
        new Product('Headset',false, 80, 4, false),
        new Product('Imported Monitor',true, 200, 5, false),
    ];
    private receipts: Receipt[]= [
        
        new Receipt( this.products.slice(), new Date(2022, 6, 29, 8, 31, 26), 1),
        new Receipt( this.products.slice(), new Date(2021, 5, 28, 7, 30, 25), 2),
        new Receipt( this.products.slice(), new Date(2022, 4, 27, 6, 29, 24), 3),
    ];

    constructor(){}

    addReceipt(newReceipt: Receipt){
        this.receipts.push(newReceipt);
    }

    getReceipts(){
        return this.receipts.slice();
    }

    getReceipt(id: number): Receipt{
        return this.receipts[id];
    }






}