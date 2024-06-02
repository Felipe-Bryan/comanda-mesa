import { storeLogo } from '../../components/storeLogo';
import { Store } from '../../types/Store';

export function defineStoreInfo(store: Store) {
  document.getElementById('storeName')!.innerText = store.name;

  const logo = document.getElementById('placeLogo')!;
  const favicon = document.getElementById('favicon')!;

  if (store.logoUrl) {
    logo.innerHTML = storeLogo(store.logoUrl);
    favicon.setAttribute('href', store.logoUrl);
  } else {
    logo.innerHTML = storeLogo('./dist/assets/images/logo.png');
    favicon.setAttribute('href', './dist/assets/images/logo.png');
  }
}
