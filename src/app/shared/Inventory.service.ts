import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { Item } from "./item.model";

@Injectable()
export class InventoryService{
    constructor(private http: HttpClient){}

    private inventoryProducts: Product[] = [
        new Product('Ethernet cable',false, 20, 0, false, 12),
        new Product('Headset',false, 80, 0, false, 2),
        new Product('Imported Monitor',true, 200, 0, false, 5),
    ];
    //private inventoryProducts: Product[] = null;
    getProducts(){
        return this.inventoryProducts.slice();
    }

    getProduct(index: number): Product{
        return this.inventoryProducts[index];
    }
    
    getNextID(){
        return this.inventoryProducts.length;
    }

    addProduct(newProduct: Product){
        let index = this.inventoryProducts.findIndex(x => x.name.toLowerCase === newProduct.name.toLowerCase && x.tax + x.unadjustedPrice === newProduct.tax + newProduct.unadjustedPrice);
        if(index > -1){
            this.inventoryProducts[index].stock += newProduct.stock;
            this.inventoryProducts[index].adjustPrice();
        }else{
            this.inventoryProducts.push(newProduct);  
        }
        //this.products$.next(this.inventoryProducts.slice())
    }

    removeProduct(index: number){
        this.inventoryProducts.splice(index, 1);
    }

    removeStock(bought: number, index){
        this.inventoryProducts[index].stock -= bought;
    }

    onSaveData(item: Item){
        this.http.post(
            'https://online-store-9bdde-default-rtdb.firebaseio.com/inventory.json', 
            item).subscribe(responseData=> { //this saves array, code was only made to track one addition at a time
                console.log(responseData);
            });
    }
    onFetchPosts(){
        this.fetchPosts();
    }

    fetchPosts() {
        return this.http
          .get<{ [key: string]: Item }>(
            'https://online-store-9bdde-default-rtdb.firebaseio.com/inventory.json'
          )
          .pipe(
            map(responseData => {
              const postsArray: Item[] = [];
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  postsArray.push({ ...responseData[key], id: key });
                }
              }
              return postsArray;
            }));
      }
    
    adjustPrice(item: Item){
        if(item.imported === true){
            item.adjustedPrice = 1.15 * item.unadjustedPrice;
        }else{
            item.adjustedPrice = item.exempt ? item.unadjustedPrice : item.unadjustedPrice * 1.1;
        }
        item.adjustedPrice *= 100;
        item.adjustedPrice = Math.round(item.adjustedPrice / 5) * 5
        item.adjustedPrice /=100;
        item.tax = item.adjustedPrice - item.unadjustedPrice;
        item.totalPrice = Math.round(item.adjustedPrice * item.quantity * 100)/100
        item.totalTax = item.tax * item.quantity;
    }
}