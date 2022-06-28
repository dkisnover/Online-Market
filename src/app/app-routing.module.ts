import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryAddComponent } from './inventory-list/inventory-add/inventory-add.component';

import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { ReceiptDisplayComponent } from './receipt-tracker/receipt-display/receipt-display.component';
import { ReceiptTrackerComponent } from './receipt-tracker/receipt-tracker.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inventory-list', pathMatch: 'full' },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'inventory-list', component: InventoryListComponent, children:[
    {path: 'add', component: InventoryAddComponent}
  ]},
  { path: 'receipt-tracker', component: ReceiptTrackerComponent, children:[
    {path: 'display', component: ReceiptDisplayComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
