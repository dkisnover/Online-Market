import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { InventoryService } from './Inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  providers: [InventoryService]
})
export class InventoryListComponent implements OnInit {
  products: Product[];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.products = this.inventoryService.getProducts();
  }

}
