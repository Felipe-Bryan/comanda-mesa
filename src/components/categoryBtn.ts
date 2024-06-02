import { Category } from '../types/Category';

export function categoryBtn(category: Category): string {
  return `
<button 
  type="button" 
  class="categoryBtn btn btn-outline-secondary ms-2 fst-italic border border-0 btn-glass" 
  id="${category.id}-btn">${category.name}
</button>`;
}
