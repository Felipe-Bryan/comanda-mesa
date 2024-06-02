import { startConsumption } from '../pages/consumption/startConsumption';
import { startMenu } from '../pages/menu/startMenu';
import { Store } from '../types/Store';
import { setNavBtnActive } from './setNavBtnActive';

export function setClickNavButtons(store: Store): void {
  document.getElementById('btnViewMenu')!.addEventListener('click', () => {
    setNavBtnActive('btnViewMenu', true);
    setNavBtnActive('btnViewConsumption', false);
    startMenu(store);
  });

  document.getElementById('btnViewConsumption')!.addEventListener('click', () => {
    setNavBtnActive('btnViewConsumption', true);
    setNavBtnActive('btnViewMenu', false);
    startConsumption();
  });
}
