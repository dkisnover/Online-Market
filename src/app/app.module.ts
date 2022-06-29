import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { RouterModule } from '@angular/router';
import { ReceiptTrackerComponent } from './receipt-tracker/receipt-tracker.component';
import { ReceiptDisplayComponent } from './receipt-tracker/receipt-display/receipt-display.component';
import { InventoryAddComponent } from './inventory-list/inventory-add/inventory-add.component';
import { ReceiptChoiceComponent } from './receipt-tracker/receipt-choice/receipt-choice.component';
import { ReceiptService } from './shared/receipt-service';

@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    ShoppingCartComponent,
    CustomHeaderComponent,
    ReceiptTrackerComponent,
    ReceiptDisplayComponent,
    InventoryAddComponent,
    ReceiptChoiceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ReceiptService],
  exports: [AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private receiptService: ReceiptService){}
}
