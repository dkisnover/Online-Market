import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../shared/receipt-service';
import { CartService } from '../shared/cart.service';
import { Item } from '../shared/item.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  items$: Observable<Item[]>;
  totalPrice: number;
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
