import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from 'src/app/shared/receipt-service';
import { Receipt } from 'src/app/shared/receipt.model';

@Component({
  selector: 'app-receipt-choice',
  templateUrl: './receipt-choice.component.html',
  styleUrls: ['./receipt-choice.component.css']
})
export class ReceiptChoiceComponent implements OnInit {
  receipt: Receipt;
  constructor(private route: ActivatedRoute, private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.receipt = this.receiptService.getReceipt(this.route.snapshot.params['id']);
  }

}
