import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../shared/receipt-service';
import { CartService } from '../shared/cart.service';
import * as dayjs from 'dayjs';
import { Item } from '../shared/item.model';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  items: Item[];
  totalPrice: number;
  constructor(private cartService: CartService, private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.refreshProducts();
  }

  refreshProducts(){
    this.items = this.cartService.getProducts();
  }

  getSum(){
    return this.cartService.getTotalPrice();
  }

  onPurchase(){
    this.receiptService.addReceipt(this.cartService.createReceipt());
    this.cartService.clear();
    this.refreshProducts();
  }

  onRemove(index: number){
    this.cartService.remove(index);
    this.refreshProducts();
  }
  getTaxes(){
    return this.cartService.getTotalTax();
  }
  getTaxless(){
    return this.getSum() - this.getTaxes();
  }

}
