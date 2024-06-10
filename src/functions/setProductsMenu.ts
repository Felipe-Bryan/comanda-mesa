import { productItem } from '../components/productItem';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { setCardClick } from './setCardClick';

export function setProductsMenu(categoriesDB: Category[], productsDB: Product[]): void {
  const productsSpot = document.getElementById('productsMenu')!;

  productsSpot.innerHTML = '';

  const categories = categoriesDB;

  const products = productsDB;

  categories.forEach((category) => {
    if (category.active === true) {
      products.forEach((product) => {
        if (product.categoryId === category.id) {
          if (product.active === true) {
            product.price = Number(product.price);

            productsSpot.innerHTML += productItem(product);
          }
        }
      });
    }
  });

  const productItems = document.querySelectorAll('.productItem');

  productItems.forEach((product) => {
    // const productId = product.id.replace('productCard', '');
    product.addEventListener('click', () => {
      setCardClick(productsDB, product.id);
    });
  });
}
