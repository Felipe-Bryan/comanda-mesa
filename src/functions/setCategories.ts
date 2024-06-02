import { categoryBtn } from '../components/categoryBtn';
import { Category } from '../types/Category';
import { getUrlValue } from '../utils/getUrlValue';

export function setCategories(categoriesData: Category[]): void {
  const categoryBar = document.getElementById('categoryBar')!;
  const categories = categoriesData;

  categoryBar.innerHTML = '';

  categoryBar.innerHTML = categoryBtn({
    id: 'all',
    name: 'Todos',
    active: true,
    storeId: getUrlValue('s'),
  });

  categories.forEach((category) => {
    if (category.active) {
      categoryBar.innerHTML += categoryBtn(category);
    }
  });

  categoryBar.innerHTML += `<hr />`;
}
