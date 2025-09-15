// src/app/components/order/order.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    console.log('Order component loaded!');
  }
}
