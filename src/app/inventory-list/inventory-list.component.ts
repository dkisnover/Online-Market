import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { Product } from '../shared/product.model';
import { CartService } from '../shared/cart.service';
import { InventoryService } from './Inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  providers: [InventoryService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryListComponent implements OnInit {
  products$: Observable<Product[]>;
  trial: Product[];

  constructor(private inventoryService: InventoryService,
              private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    //this.products$ = new Observable<Product[]>( productList => {this.inventoryService.getProducts()} );
    this.reloadInventory();
  }

  reloadInventory(){
    this.trial = this.inventoryService.getProducts();
  }

  onAddActivate(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onAddToCart(product: Product){
    let tempProduct = new Product(product.name, product.imported, product.unadjustedPrice, product.quantity, product.exempt);
    this.cartService.addProduct(tempProduct);
    product.quantity = 0;
    //product.quantity = 0;   
    //this.cartService.
  }

}
