import { CartItem } from './cart-item.model';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  cardholderName: string;
  cardLastFour: string;
  orderDate: Date;
}
