import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Item } from "./item.model";
import { Receipt } from "./receipt.model";

@Injectable()
export class ReceiptService {
    private receipts: Receipt[] = []

    constructor(private http: HttpClient){}

    addReceipt(newReceipt: Receipt){
        this.receipts.push(newReceipt);
        this.storeReceipts();
    }

    getReceipts(){
        return this.receipts.slice();
    }

    getReceipt(id: number): Receipt{
        return this.receipts[id];
    }
    storeReceipts(){
        this.http.put('https://online-store-9bdde-default-rtdb.firebaseio.com/receipts.json', this.receipts).subscribe(response =>{
        })
    }

    fetchReceipts(): Observable<Receipt[]>{
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