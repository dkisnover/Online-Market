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
    private receipts: Receipt[] = []
    /*private receipts: Receipt[]= [
        
        new Receipt( this.products.slice(), new Date(2022, 5, 23)),
        new Receipt( this.products.slice(), new Date(2021, 5, 28)),
        new Receipt( this.products.slice(), new Date(2022, 4, 27)),
    ];*/

    constructor(){}

    addReceipt(newReceipt: Receipt){
        console.log(newReceipt.purchaseDate);
        this.receipts.push(newReceipt);
    }

    getReceipts(){
        return this.receipts.slice();
    }

    getReceipt(id: number): Receipt{
        return this.receipts[id];
    }






}