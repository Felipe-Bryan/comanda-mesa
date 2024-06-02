import { productItem } from '../components/productItem';
import { Product } from '../types/Product';
import { setCardClick } from './setCardClick';

export function setFilter(products: Product[]): void {
  const filtered = document.querySelectorAll('.categoryBtn');

  filtered.forEach((item) => {
    item.addEventListener('click', () => {
      const categoryId = item.id.replace('-btn', '');
      setProductsByCategory(categoryId, products);
    });
  });
}

function setProductsByCategory(id: string, products: Product[]): void {
  const productsSpot = document.getElementById('productsMenu')!;
  productsSpot.innerHTML = '';

  products.forEach((item) => {
    if (item.active) {
      if (item.categoryId === id) {
        productsSpot.innerHTML += productItem(item);
      }
    }
  });

  const productItems = document.querySelectorAll('.productItem');

  productItems.forEach((product) => {
    // const productId = product.id.replace('productCard', '');
    product.addEventListener('click', () => {
      setCardClick(products, product.id);
    });
  });
}
