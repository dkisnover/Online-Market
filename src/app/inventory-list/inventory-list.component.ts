import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { Product } from '../shared/product.model';
import { CartService } from '../shared/cart.service';
import { InventoryService } from '../shared/Inventory.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  providers: [],
})
export class InventoryListComponent implements OnInit {
  trial: Item[];

  constructor(private inventoryService: InventoryService,
              private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    //this.products$ = new Observable<Product[]>( productList => {this.inventoryService.getProducts()} );
    this.reloadInventory();
  }

  newAdded(elementRef){
    elementRef.inventoryChanged.subscribe( event => {
      this.reloadInventory();
    });
  }

  reloadInventory(){
    console.log("reloaded");
    this.trial = this.inventoryService.getItems();
    console.log(this.trial);
  }

  onAddActivate(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onAddToCart(product: Product, index: number){
    if(product.quantity <= product.stock){
      let tempProduct = new Product(product.name, product.imported, product.unadjustedPrice, product.quantity, product.exempt);
      this.cartService.addProduct(tempProduct);
      this.inventoryService.removeStock(product.quantity, index);
      console.log(this.inventoryService.getItem(index).stock);
      if(this.inventoryService.getItem(index).stock === 0){
        this.inventoryService.removeItem(index);
      }
    }
    product.quantity = 0;
    this.reloadInventory();
  }

}
