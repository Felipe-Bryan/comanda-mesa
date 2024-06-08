export interface Required {
  id: string;
  title: string;
  items: RequiredItem[];
  productId: string;
  active: boolean;
}

export interface RequiredItem {
  id: string;
  name: string;
  price: number;
  requiredId: string;
}
