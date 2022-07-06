import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private route: ActivatedRoute,
              private http: HttpClient) { }
  receipts: Receipt[];
  isFetching = false;

  ngOnInit(): void {
    this.isFetching = true;
    this.receiptService.onFetchReceipts().subscribe(posts =>{
      this.isFetching = false;
      this.receipts = posts;
      this.receiptService.setReceipts(posts);
    });
  }

  onViewReceipt(index: number){
    this.router.navigate([index], {relativeTo: this.route});

  }
  onFetchPosts(){
    this.isFetching = true;
    this.receiptService.onFetchReceipts().subscribe(posts =>{
      this.isFetching = false;
      this.receipts = posts;
      this.receiptService.setReceipts(posts);
    });
  }

}
