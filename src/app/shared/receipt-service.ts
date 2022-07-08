import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Item } from "./item.model";
import { Receipt } from "./receipt.model";

@Injectable()
export class ReceiptService {
    private receipts: Receipt[] = []
    /*private receipts: Receipt[]= [
        
        new Receipt( this.products.slice(), new Date(2022, 5, 23)),
        new Receipt( this.products.slice(), new Date(2021, 5, 28)),
        new Receipt( this.products.slice(), new Date(2022, 4, 27)),
    ];*/

    constructor(private http: HttpClient){}

    addReceipt(newReceipt: Receipt){
        this.receipts.push(newReceipt);
        this.storeInventory();
    }

    getReceipts(){
        return this.receipts.slice();
    }

    getReceipt(id: number): Receipt{
        return this.receipts[id];
    }
    storeInventory(){
        this.http.put('https://online-store-9bdde-default-rtdb.firebaseio.com/receipts.json', this.receipts).subscribe(response =>{
            console.log(response);
        })
    }

    fetchInventory(): Observable<Receipt[]>{
        console.log('fetch inventory hit')
        return this.http.get<Receipt[]>('https://online-store-9bdde-default-rtdb.firebaseio.com/receipts.json')
            .pipe(map(receipts => {
                receipts ? this.receipts = receipts : this.receipts = [];
                this.receipts.forEach(x => {
                    x.purchaseDate = new Date(x.purchaseDate);
                });
                return this.receipts;
            }))
    }






}