import { Injectable } from "@angular/core";
import { Receipt } from "./receipt.model";

@Injectable()
export class ReceiptService {
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