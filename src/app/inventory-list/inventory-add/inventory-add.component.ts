import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/product.model';
import { InventoryService } from '../Inventory.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {
  @ViewChild('f', {static: false}) slForm: NgForm;
  constructor(private inventoryService: InventoryService, private router: Router, private route: ActivatedRoute) { }
  product: Product;

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newProduct = new Product(value.name, value.imported, this.inventoryService.getNextID(), value.price, 0, value.exempt)
    this.inventoryService.addProduct(newProduct);
    form.reset;
    this.onCancel();
  }  

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
