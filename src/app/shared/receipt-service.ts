import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Item } from "./item.model";
import { Product } from "./product.model";
import { Receipt } from "./receipt.model";

@Injectable()
export class ReceiptService {
    private products: Product[] = [
        new Product('Ethernet cable',false, 20, 3, false),
        new Product('Headset',false, 80, 4, false),
        new Product('Imported Monitor',true, 200, 5, false),
    ];
    /*private receipts: Receipt[]= [
        
        new Receipt( this.products.slice(), new Date(2022, 5, 23)),
        new Receipt( this.products.slice(), new Date(2021, 5, 28)),
        new Receipt( this.products.slice(), new Date(2022, 4, 27)),
    ];*/

    constructor(private http: HttpClient){}

    /*addReceipt(newReceipt: Receipt){
        console.log(newReceipt.purchaseDate);
        this.receipts.push(newReceipt);
    }*/

    /*getReceipts(){
        return this.receipts.slice();
    }*/

    /*getReceipt(id: number): Receipt{
        return this.receipts[id];
    }*/

    onSaveData(receipt: Receipt){
        this.http.post(
            'https://online-store-9bdde-default-rtdb.firebaseio.com/receipts.json', 
            receipt).subscribe(responseData=> { //this saves array, code was only made to track one addition at a time
                console.log(responseData);
            });
    }
    onFetchReceipts() {
        return this.http
          .get<{ [key: string]: Receipt }>(
            'https://online-store-9bdde-default-rtdb.firebaseio.com/inventory.json'
          )
          .pipe(
            map(responseData => {
              const postsArray: Receipt[] = [];
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  postsArray.push({ ...responseData[key], id: key });
                }
              }
              return postsArray;
            }));
      }






}