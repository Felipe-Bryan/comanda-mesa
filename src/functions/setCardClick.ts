import { v4 } from 'uuid';
import { Order } from '../types/Order';
import { Product } from '../types/Product';
import { getUrlValue } from '../utils/getUrlValue';
import { saveToStorage } from '../utils/saveToStorage';
import { componentVisibility } from '../utils/componentVisibility';
import { requiredItem } from '../components/requiredItem';
import { additionalItem } from '../components/additionalItem';
import { watchCheckboxes } from './watchCheckboxes';
import { buttonQt } from '../components/btnQt';
import { addOrderQt } from './addOrderQt';
import { removeOrderQt } from './removeOrderQt';
import { modalFooter } from '../components/modalFooter';
import { watchRadios } from './watchRadios';
import { saveOrder } from './saveOrder';
import { getStorageData } from '../utils/getStorageData';

export function setCardClick(products: Product[], productId: string) {
  const commentIpt = <HTMLInputElement>document.getElementById('comment')!;
  commentIpt.value = '';
  // Pega o produto no banco de dados

  const customerNameIpt = <HTMLInputElement>document.getElementById('customerName')!;

  customerNameIpt.value = getStorageData('customerName');

  const productFound = products.find((product) => {
    return product.id === productId;
  })!;

  const newOrder: Order = {
    id: v4(),
    tableId: getUrlValue('t'),
    storeId: getUrlValue('s'),
    productId: productFound.id,
    quantity: 1,
    value: Number(productFound.price),
    status: 'Enviado',
    active: true,
    productPrice: Number(productFound.price),
    productName: productFound.name,
    customerId: customerNameIpt.value,
  };

  saveToStorage('newOrder', newOrder);

  // Define nome do Modal com nome do produto
  document.getElementById('cartModalLabel')!.innerText = productFound.name;

  // Localiza o elemento HTML onde ficarão os itens de seleção obrigatória
  const requiredOptionsSpot = document.getElementById('requiredOptions')!;
  // reseta o código existente caso exista
  requiredOptionsSpot.innerHTML = '';

  // verifica se o produto tem itens de seleção obrigatoria
  if (productFound.requireds) {
    if (productFound.requireds.length > 0) {
      let activeItems = 0;

      productFound.requireds.forEach((req) => {
        if (req.active === true) {
          activeItems += 1;
        }
      });

      if (activeItems > 0) {
        componentVisibility('requiredOptions', 'show');

        for (let i = 0; i < productFound.requireds.length; i++) {
          if (productFound.requireds[i].active === true) {
            productFound.requireds[i].items.forEach((reqItem) => {
              if (reqItem.active === true && reqItem.requiredId === productFound.requireds[i].id) {
                requiredOptionsSpot.innerHTML += requiredItem(productFound.requireds[i], i);
              }
            });
          }
        }
      } else {
        componentVisibility('requiredOptions', 'hide');
      }
    }
  }

  const additionalItemsSpot = document.getElementById('additionalItems')!;
  additionalItemsSpot.innerHTML = '';

  // verifica se o produto tem itens de seleção opcional
  if (productFound.additionals) {
    if (productFound.additionals.length > 0) {
      let activeItems = 0;

      productFound.additionals.forEach((add) => {
        if (add.active === true) {
          activeItems += 1;
        }
      });

      if (activeItems > 0) {
        // caso tenha habilita visualização do campo onde serão exibidos os itens
        componentVisibility('additionalOptions', 'show');

        //define o componente para cada item encontrado
        for (let i = 0; i < productFound.additionals.length; i++) {
          if (productFound.additionals[i].active === true) {
            additionalItemsSpot.innerHTML += additionalItem(productFound.additionals[i], i);
          }
        }
      } else {
        // esconde o campo caso não haja itens de seleção opcional
        componentVisibility('additionalOptions', 'hide');
      }
    }
  }

  watchRadios(products);
  watchCheckboxes();

  componentVisibility('orderValueSpot', 'show');

  document.getElementById('orderValue')!.innerText = productFound.price.toFixed(2);

  document.getElementById('btnQt')!.innerHTML = buttonQt();

  document.getElementById('btnAdd')!.addEventListener('click', () => {
    addOrderQt();
  });

  document.getElementById('btnRemove')!.addEventListener('click', () => {
    removeOrderQt();
  });

  document.getElementById('modalFooter')!.innerHTML = modalFooter('Voltar', 'Enviar Pedido');

  document.getElementById('addOrder')!.addEventListener('click', () => {
    saveOrder();
  });
}
