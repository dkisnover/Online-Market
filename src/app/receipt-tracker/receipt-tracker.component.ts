import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/*
@Author: Declan Kelly
@params: N/A
component used exclusively to route to receipt display (by default) and receipt choice (on view, see receipt-display)
*/
@Component({
  selector: 'app-receipt-tracker',
  templateUrl: './receipt-tracker.component.html',
  styleUrls: ['./receipt-tracker.component.css']
})
export class ReceiptTrackerComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['display'], {relativeTo: this.route});

  }

  onInfoRequest(){
    this.router.navigate(['choice'], {relativeTo: this.route});
  }

}
