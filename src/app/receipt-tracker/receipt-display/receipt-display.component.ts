import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReceiptService } from 'src/app/shared/receipt-service';
import { Receipt } from 'src/app/shared/receipt.model';

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
    this.receipts$ = this.receiptService.fetchInventory();
  }

  onViewReceipt(index: number){
    this.router.navigate([index], {relativeTo: this.route});

  }

}
