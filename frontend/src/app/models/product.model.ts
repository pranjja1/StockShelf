// product.model.ts
// frontend/src/app/models/product.model.ts

export interface Product {
  product_id?: number;         // Optional during creation
  name: string;
  category: string;
  description?: string;
  price: number;
  stock: number;
  min_stock_limit: number;
}
