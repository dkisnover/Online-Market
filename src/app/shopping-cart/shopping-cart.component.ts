import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [CartService]
})
export class ShoppingCartComponent implements OnInit {
  products: Product[];
  totalPrice: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
  }

  getSum(){
    return this.cartService.getTotalPrice();
  }

}
