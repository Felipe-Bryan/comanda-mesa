export interface Required {
  id: string;
  title: string;
  items: RequiredItem[];
  productId: string;
}

export interface RequiredItem {
  id: string;
  name: string;
  price: number;
  requiredId: string;
}
