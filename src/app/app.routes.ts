import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
];
