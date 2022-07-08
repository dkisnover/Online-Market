import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReceiptService } from 'src/app/shared/receipt-service';
import { Receipt } from 'src/app/shared/receipt.model';

/*
@Author: Declan Kelly
@params: N/A
the core of this program is the display in the html, the typescript is used to redirect to receipt-choice with an ID coresponding to the receipt's
index. Most of the actual programming is done in the receipt service. The view button onclick routes to the onViewReceipt which is used to route to 
receipt-choice
*/
@Component({
  selector: 'app-receipt-display',
  templateUrl: './receipt-display.component.html',
  styleUrls: ['./receipt-display.component.css']
})
export class ReceiptDisplayComponent implements OnInit {
  constructor(private receiptService: ReceiptService,
              private router: Router,
              private route: ActivatedRoute) { }
  receipts$: Observable<Receipt[]>;

  ngOnInit(): void {
    this.receipts$ = this.receiptService.fetchReceipts();
  }

  onViewReceipt(index: number){
    this.router.navigate([index], {relativeTo: this.route});

  }

}
