import { Component, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
import { InventoryService } from '../Inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {
  @ViewChild('f', {static: false}) slForm: NgForm;
  constructor(private inventoryService: InventoryService, private router: Router, private route: ActivatedRoute) { }
  product: Product;

  @Output()
  private inventoryChanged = new EventEmitter();

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm){
    const value = form.value;
    console.log("name is : " + value.name);
    const newProduct = new Product(value.name, (value.imported) ? true : false, value.price, 0, (value.exempt) ? true : false)
    this.inventoryService.addProduct(newProduct);
    form.reset;
    this.onCancel();
    this.inventoryChanged.emit();
  }  

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
