import { startConsumption } from '../pages/consumption/startConsumption';
import { startMenu } from '../pages/menu/startMenu';
import { setNavBtnActive } from './setNavBtnActive';

export function setClickNavButtons(): void {
  document.getElementById('btnViewMenu')!.addEventListener('click', () => {
    startMenu();
  });

  document.getElementById('btnViewConsumption')!.addEventListener('click', () => {
    startConsumption();
  });
}
