import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from 'src/app/shared/receipt-service';
import { Receipt } from 'src/app/shared/receipt.model';

/*
@Author: Declan Kelly
@params: id: number
The paramater is used to get a receipt from the receipt service in order to display it's information.
No additional changing of data occurs in this method
*/
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
