import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { InventoryService } from './Inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
  }

}
