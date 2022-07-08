import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Receipt } from "./receipt.model";


/*
Author: Declan Kelly
Receipt service is an injectable service for the purpose of managing the Receipt's process as well as providing the receipt
from the backend and making it accessible to components that need it
*/
@Injectable()
export class ReceiptService {
    private receipts: Receipt[] = []

    constructor(private http: HttpClient){}

    /*
    params: newReceipt: Receipt
        adds receipt recieved as param, saves information.
    */
    addReceipt(newReceipt: Receipt){
        this.receipts.push(newReceipt);
        this.storeReceipts();
    }

    /*
    params: id: number
    return: Receipt
        takes id, returns receipt at index of id on receipt array
    */
    getReceipt(id: number): Receipt{
        return this.receipts[id];
    }

    /*
    saves receipts array into backend
    */
    storeReceipts(){
        this.http.put('https://online-store-9bdde-default-rtdb.firebaseio.com/receipts.json', this.receipts).subscribe(response =>{
        })
    }

    /*
    return: Observable<Receipt[]>
        returns observable of receipt after grafting receipt values onto the array in the service. 
        In addition, changes the purchaseDate of each receipt to a new date taking the purchaseDate as an argument
        because the natural return from the .json format does not properly format the date
    */
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