import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Item } from "./item.model";
import { map } from "rxjs";


@Injectable()
export class CartService{

    constructor(private http: HttpClient){

    }
    getTotalPrice(items: Item[]){
        var price = 0;
        for(var item of items){
            price += item.totalPrice;
        }
        return price;
    }
    getTotalTax(items: Item[]){
        var price = 0;
        for(var item of items){
            price += item.totalTax;
        }
        return price;
    }
    /*addProduct(newProduct: Product){
        newProduct.adjustPrice();
        if(this.cartProducts.length === 0 ){
            this.cartProducts =[
                newProduct
            ];
        }else{
            let index = this.cartProducts.findIndex(x => x.name.toLowerCase === newProduct.name.toLowerCase && x.tax + x.unadjustedPrice === newProduct.tax + newProduct.unadjustedPrice);
            if(index > -1){
                this.cartProducts[index].quantity += newProduct.quantity;
                this.cartProducts[index].adjustPrice();
            }else{
                this.cartProducts.push(newProduct);  
            }
        }

    }*/
    onFetchItems(){
        return this.http
        .get<{ [key: string]: Item }>(
          'https://online-store-9bdde-default-rtdb.firebaseio.com/cart.json'
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
    onSaveItem(item: Item){
        this.http.post(
            'https://online-store-9bdde-default-rtdb.firebaseio.com/cart.json', item)
            .subscribe(responseData=> { //this saves array, code was only made to track one addition at a time
                console.log(responseData);
            });
    }
    deleteItems(){
        return this.http.delete('https://online-store-9bdde-default-rtdb.firebaseio.com/cart.json') 
    }
}
