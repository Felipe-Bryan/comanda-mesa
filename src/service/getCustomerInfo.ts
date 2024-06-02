import { saveToStorage } from '../utils/saveToStorage';
import { apiData } from './api.service';

export async function getCustomerData(id: string) {
  Promise.all([
    await new apiData().getData('store', id).then((data) => {
      saveToStorage('storeInfo', data);
    }),

    await new apiData().getData('category/store', id).then((data) => {
      saveToStorage('categoryInfo', data);
    }),

    await new apiData().getData('product/store', id).then((data) => {
      saveToStorage('productInfo', data);
    }),

    await new apiData().getData('additional/store', id).then((data) => {
      saveToStorage('additionalInfo', data);
    }),

    await new apiData().getData('required/store', id).then((data) => {
      saveToStorage('requiredInfo', data);
    }),

    await new apiData().getData('required-item/store', id).then((data) => {
      saveToStorage('requiredItemInfo', data);
    }),
  ]).then(() => {
    return true;
  });
}
