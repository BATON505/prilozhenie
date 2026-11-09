export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  roast: string;
  price: number;
  weight: string;
  description: string;
  notes: string[];
  altitude: string;
  process: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  items: CartItem[];
  total: number;
  customer: CustomerInfo;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}
