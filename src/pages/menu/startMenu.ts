import { setCategories } from '../../functions/setCategories';
import { setFilter } from '../../functions/setFilter';
import { setProductsMenu } from '../../functions/setProductsMenu';
import { Store } from '../../types/Store';
import { componentVisibility } from '../../utils/componentVisibility';
import { getStorageData } from '../../utils/getStorageData';

export async function startMenu() {
  const store: Store = getStorageData('storeInfo');

  componentVisibility('help', 'show');
  componentVisibility('btnHelp', 'show');
  componentVisibility('tableConsumption', 'hide');
  componentVisibility('categoryNav', 'show');
  componentVisibility('productsMenu', 'show');
  componentVisibility('loading', 'hide');

  setCategories(store.categories);

  setProductsMenu(store.categories, store.products);
  setFilter(store.products);

  document.getElementById('all-btn')!.addEventListener('click', () => {
    setProductsMenu(store.categories, store.products);
  });

  window.scrollTo(0, 0);
}
