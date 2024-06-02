import { startApp } from './pages/home/startApp';
import { getCustomerData } from './service/getCustomerInfo';
import { getUrlValue } from './utils/getUrlValue';

Promise.all([getCustomerData(getUrlValue('s'))]).then(() => startApp());
