// order.model.ts
// frontend/src/app/models/order.model.ts

export interface OrderItem {
  product_id: number;
  product_name?: string;  // optional when submitting
  quantity: number;
}

export interface Order {
  order_id?: number;       // auto-generated, optional when creating
  customer_name: string;
  address: string;
  order_time?: string;     // returned from backend
  items: OrderItem[];
}
