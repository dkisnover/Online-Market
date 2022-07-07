import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { InventoryService } from '../shared/Inventory.service';
import { Item } from '../shared/item.model';
import { Observable } from "rxjs";


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  providers: [],
})
export class InventoryListComponent implements OnInit {
  trial: Item[];
  items$: Observable<Item[]>;

  constructor(private inventoryService: InventoryService,
              private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService,) { }

  ngOnInit(): void {
    //this.products$ = new Observable<Product[]>( productList => {this.inventoryService.getProducts()} );
    console.log('ngonit hit');
    this.reloadInventory();
  }

  newAdded(elementRef){
    elementRef.inventoryChanged.subscribe( event => {
      this.inventoryService.storeInventory();
    });
  }

  reloadInventory(){
    console.log("reloaded");
    //console.log(this.inventoryService.getItems())
    this.items$ = this.inventoryService.getItems();
    //console.log('trial');
    //console.log(this.trial);
    //console.log('service');
    //console.log(this.inventoryService.getItems());
  }

  onAddActivate(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onAddToCart(item: Item, index: number){
    if(item.quantity <= item.stock){
      let tempItem: Item = {
        name: item.name,
        imported: item.imported,
        unadjustedPrice: item.unadjustedPrice,
        adjustedPrice: item.adjustedPrice,
        quantity: item.quantity,
        exempt: item.exempt,
        totalPrice: item.totalPrice,
        tax: item.tax,
        totalTax: item.tax
      }
      item.quantity = 0;
      this.cartService.addItem(tempItem);
      this.inventoryService.removeStock(tempItem.quantity, index);
      this.inventoryService.adjustPrice(tempItem);
      console.log(this.inventoryService.getItem(index).stock);
      if(this.inventoryService.getItem(index).stock === 0){
        this.inventoryService.removeItem(index);
      }
    }
  }
}
