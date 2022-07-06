import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ReceiptService } from '../shared/receipt-service';
import { Receipt } from '../shared/receipt.model';
import { CartService } from '../shared/cart.service';
import * as dayjs from 'dayjs';
import { Item } from '../shared/item.model';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  products: Item[];
  totalPrice: number;
  isFetching = false;
  constructor(private cartService: CartService, private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.cartService.onFetchItems().subscribe(posts =>{
      this.isFetching = false;
      this.products = posts;
    });
  }

  getSum(){
    return this.cartService.getTotalPrice(this.products);
  }

  onPurchase(){
    let now = dayjs();
    let receipt: Receipt = {
      purchases: this.products,
      totalCost: this.getSum(),
      purchaseDate: new Date(now.year(),now.month() + 1, now.date()),
      totalTaxes: this.getTaxes(),
      totalTaxless: this.getTaxless()
    }
    this.receiptService.onSaveData(receipt);
    this.onClearCart();
    this.onFetchPosts();
    
    /*console.log("on purchase: " + now.year());
    this.receiptService.addReceipt(new Receipt(
      this.products, new Date(now.year(),now.month() + 1, now.date())
    ))
    this.cartService.clear();
    this.refreshProducts();*/
  }

  onRemove(index: number){
    return null;
  }
  getTaxes(){
    return this.cartService.getTotalTax(this.products);
  }
  getTaxless(){
    return this.getSum() - this.getTaxes();
  }
  onFetchPosts(){
    this.isFetching = true;
    this.cartService.onFetchItems().subscribe(posts =>{
      this.isFetching = false;
      this.products = posts;
    });
  }

  onClearCart(){
    this.cartService.deleteItems().subscribe(() =>{
      this.products = [];
    });
  }
}
