import { Additional } from '../types/Additional';

export function additionalItem(additionalItem: Additional, sequency: number): string {
  return `
  <div class="form-check">
      <input class="form-check-input additional" type="checkbox" name="additionalItem" id="${
        additionalItem.id
      }" title="${additionalItem.name}" value="${additionalItem.price}"/>
      <label class="form-check-label w-100" for="${additionalItem.id}">
          <div class="d-flex justify-content-between w-100">
              <div class="fst-italic">${additionalItem.name}</div>
              <div>R$ ${Number(additionalItem.price).toFixed(2)}</div>
          </div>
      </label>
  </div>`;
}
