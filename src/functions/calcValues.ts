import { Order } from '../types/Order';

export function calcValues(product: Order) {
  let value = Number(product.productPrice) * Number(product.quantity);

  if (product.additionalSelected !== undefined) {
    for (let i = 0; i < product.additionalSelected.length; i++) {
      value += Number(product.additionalSelected[i].price) * Number(product.quantity);
    }
  }

  if (product.requiredSelected !== undefined) {
    for (let i = 0; i < product.requiredSelected.length; i++) {
      value += Number(product.requiredSelected[i].price) * Number(product.quantity);
    }
  }

  return value;
}
