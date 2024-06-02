import { startConsumption } from '../pages/consumption/startConsumption';
import { startMenu } from '../pages/menu/startMenu';
import { setNavBtnActive } from './setNavBtnActive';

export function setClickNavButtons(): void {
  document.getElementById('btnViewMenu')!.addEventListener('click', () => {
    setNavBtnActive('btnViewMenu', true);
    setNavBtnActive('btnViewConsumption', false);
    startMenu();
  });

  document.getElementById('btnViewConsumption')!.addEventListener('click', () => {
    setNavBtnActive('btnViewConsumption', true);
    setNavBtnActive('btnViewMenu', false);
    startConsumption();
  });
}
