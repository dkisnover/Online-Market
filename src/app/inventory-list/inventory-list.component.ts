import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { Product } from '../product.model';
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
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.products$ = new Observable<Product[]>( productList => {this.inventoryService.getProducts()} );
    this.reloadInventory();
  }

  reloadInventory(){
    this.products$ = this.inventoryService.getProducts();
    console.log(this.products$);
  }

  onAddActivate(){
    console.log("hello");
    this.router.navigate(['add'], {relativeTo: this.route});
  }

}
