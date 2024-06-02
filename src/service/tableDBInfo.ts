import { saveToStorage } from '../utils/saveToStorage';
import { apiData } from './api.service';

export async function tableDBInfo(id: string) {
  Promise.all([
    await new apiData().getData('table', id).then((data) => {
      saveToStorage('tableInfo', data);
    }),

    await new apiData()
      .getData('order/table', id)
      .then((data) => {
        saveToStorage('tableOrderInfo', data);
      })
      .then(async () => {
        await new apiData()
          .getData('additional-selected/table', id)
          .then((data) => {
            saveToStorage('tableAdditionalInfo', data);
          })
          .then(async () => {
            await new apiData().getData('required-selected/table', id).then((data) => {
              saveToStorage('tableRequiredInfo', data);
            });
          });
      }),
  ]).then(() => {
    return true;
  });
}
