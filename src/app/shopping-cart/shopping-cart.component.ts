import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ReceiptService } from '../shared/receipt-service';
import { Receipt } from '../shared/receipt.model';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  products: Product[];
  totalPrice: number;
  constructor(private cartService: CartService, private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.refreshProducts();
  }

  refreshProducts(){
    this.products = this.cartService.getProducts();
  }

  getSum(){
    return this.cartService.getTotalPrice();
  }

  onPurchase(){
    this.receiptService.addReceipt(new Receipt(
      this.products, new Date()
    ))
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
