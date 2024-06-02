import { AdditionalSelected } from '../types/AdditionalSelected';
import { Order } from '../types/Order';
import { RequiredSelected } from '../types/RequiredSelected';

function tableProductInfo(item: Order) {
  return `
<div class="row fw-semibold mw-100">
  <div class="col fs-5">${item.productName}</div>
</div>
<div class="row">
  <div class="col-8 text-end">Valor unitário</div>
  <div class="col text-end">R$ ${item.productPrice.toFixed(2)}</div>
</div>`;
}

function tableRequired(item: RequiredSelected) {
  return `
    <div class="row fst-italic px-1">
      <div class="col-8">• ${item.name}</div>
      <div class="col text-end">+ R$ ${item.price.toFixed(2)}</div>
    </div>`;
}

function tableAdditional(item: AdditionalSelected) {
  return `
<div class="row fst-italic px-1">
  <div class="col-8">• ${item.name}</div>
  <div class="col text-end">+ R$ ${item.price.toFixed(2)}</div>
</div>`;
}

function tableComment(text: string) {
  return `
<div class="row fst-italic px-1">
  <div class="col-12">${text}</div>
</div>`;
}

function tableStatus(status: string) {
  return `
<div class="row fw-semibold">
  <div class="col-8 text-end">Status:</div>
  <div class="col text-center">${status}</div>
</div>`;
}

function tableSubtotal(product: Order) {
  return `
<div class="row fw-semibold">
  <div class="col-8 text-end">Quantidade</div>
  <div class="col text-center">${product.quantity}</div>
</div>

<div class="row fw-semibold">
  <div class="col-8 text-end">Subtotal</div>
  <div class="col text-end">R$ ${product.value.toFixed(2)}</div>
</div>
<hr class="m-0 p-0" />`;
}

function tableItem(product: Order) {
  let tableHTML: string = '';

  tableHTML += tableProductInfo(product);

  if (product.requiredSelected) {
    for (let i = 0; i < product.requiredSelected.length; i++) {
      tableHTML += tableRequired(product.requiredSelected[i]);
    }
  }

  if (product.additionalSelected) {
    if (product.additionalSelected.length > 0) {
      product.additionalSelected.forEach((item) => (tableHTML += tableAdditional(item)));
    }
  }

  if (product.comment) {
    tableHTML += tableComment(product.comment);
  }

  if (product.status) {
    tableHTML += tableStatus(product.status);
  }

  tableHTML += tableSubtotal(product);

  return tableHTML;
}

export function tableOrderItem(product: Order) {
  const table = document.getElementById('tableContent')!;

  table.innerHTML += `
<div class="container glass p-1 m-0 my-1">
  ${tableItem(product)}
</div>`;
}
