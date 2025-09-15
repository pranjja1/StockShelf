// order.service.ts
// frontend/src/app/services/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  // ✅ Place a new order
  placeOrder(order: Order): Observable<any> {
    return this.http.post(this.baseUrl, order);
  }

  // ✅ Fetch all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }
}
