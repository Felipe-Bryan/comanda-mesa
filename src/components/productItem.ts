import { Product } from '../types/Product';

export function productItem(product: Product): string {
  return `
<div class="card w-auto mx-2 mb-1 productItem glass" id="${
    product.id
  }" data-bs-toggle="modal" data-bs-target="#cartModal">
  <div class="card-body p-1">
    <div class="d-flex align-items-end">
      <div class="me-1 w-25">
        <img 
        src="${product.imageUrl || './dist/assets/images/food-icon.png'}" 
        class="img-thumbnail border border-0 inner-glass" 
        alt="${product.name}" />
      </div>
      <h5 class="card-title">${product.name}</h5>
    </div>

    <div>
      <p class="card-text mb-1 fst-italic">${product.description}</p>
      <p class="card-text text-end fst-italic" id="${product.id}-price">R$ ${product.price.toFixed(2)}</p>
    </div>
  </div>
</div>`;
}
