import { Address } from './Address';
import { Phone } from './Phone';
import { Store } from './Store';

export interface Owner {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;

  stores: Store[];
  phones: Phone[];
  address: Address[];
}
