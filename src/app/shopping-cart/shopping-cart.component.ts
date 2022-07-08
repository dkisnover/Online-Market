import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../shared/receipt-service';
import { CartService } from '../shared/cart.service';
import { Item } from '../shared/item.model';
import { Observable } from 'rxjs';

/*
@Author: Declan Kelly
@params: N/A
Displays Contents of cart as fetched from an http request in cartService. Also displays aggregate data such as the sum, the total taxes,
and total cost. A purchase function is provided onClick of a purchase button, that creates a receipt that is stored in the backend via
receiptService, then clears the cart. Items in Cart can be edited via a removal function.
*/
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  items$: Observable<Item[]>;
  constructor(private cartService: CartService, private receiptService: ReceiptService) { }
  
  ngOnInit(): void {
    this.items$ = this.cartService.fetchCart();
  }
  getSum(){
    return this.cartService.getTotalPrice();
  }

  onPurchase(){
    this.receiptService.addReceipt(this.cartService.createReceipt());
    this.cartService.clear();
  }

  onRemove(index: number){
    this.cartService.remove(index);
    this.cartService.storeCart();
  }
  getTaxes(){
    return this.cartService.getTotalTax();
  }
  getTaxless(){
    return this.getSum() - this.getTaxes();
  }

}
