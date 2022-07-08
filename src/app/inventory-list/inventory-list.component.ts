import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { InventoryService } from '../shared/Inventory.service';
import { Item } from '../shared/item.model';
import { Observable } from "rxjs";

/*
@Author: Declan Kelly
@params: N/A
inventory list component displays the inventory presented. The code uses an async functionality to update when changed,
using the items observable as a representation. on entry, the program uses the inventory service to make an http request
and retrieve data. While on this page, the user can select a number, represented via the quantity of the item interface.
The user can use the add to cart feature to use onAddToCart and ad it to the cart service. Add activated is used to display
the child component, inventory-add
*/
@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  providers: [],
})
export class InventoryListComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private inventoryService: InventoryService,
              private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService,) { }

  ngOnInit(): void {
    this.items$ = this.inventoryService.fetchInventory();
  }

  newAdded(elementRef){
    elementRef.inventoryChanged.subscribe( event => {
      this.inventoryService.storeInventory();
    });
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
      if(this.inventoryService.getItem(index).stock === 0){
        this.inventoryService.removeItem(index);
      }
    }
  }
}
