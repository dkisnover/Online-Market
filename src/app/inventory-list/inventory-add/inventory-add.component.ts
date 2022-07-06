import { Component, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
import { InventoryService } from '../../shared/Inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.css']
})
export class InventoryAddComponent implements OnInit {
  @ViewChild('f', {static: false}) slForm: NgForm;
  constructor(private inventoryService: InventoryService, private router: Router, private route: ActivatedRoute) { }
  addForm: FormGroup;

  @Output()
  private inventoryChanged = new EventEmitter();

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required, Validators.min(0.01)]),
      'stock': new FormControl(null, [Validators.required, Validators.min(1), this.checkInteger]),
      'imported': new FormControl(null),
      'exempt': new FormControl(null),
    });
  }

  onSubmit(){
    console.log("accessed");
    const value = this.addForm.value;
    //const newProduct = new Product(value.name, (value.imported) ? true : false, value.price, 0, (value.exempt) ? true : false, value.stock)
    const newItem: Item = {
        name: value.name,
        imported: (value.imported) ? true : false,
        unadjustedPrice: value.price,
        adjustedPrice: 0,
        quantity: 0,
        exempt: (value.exempt) ? true : false,
        totalPrice: 0,
        stock: value.stock,
        tax: 0,
        totalTax: 0
    }
    this.inventoryService.addItem(newItem);
    this.addForm.reset;
    this.inventoryChanged.emit();
    this.onCancel();
  }  

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  checkInteger(control: FormControl): {[s: string]: boolean} {
    console.log(control.value);
    if(!Number.isInteger(control.value)){
      return {'numberIsInteger': true}
    }
    return null;
  }

}
