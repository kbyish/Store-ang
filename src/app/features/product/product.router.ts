import { Routes } from '@angular/router';
import { ProductList } from '../product/pages/page-list/page-list.component';


export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductList },
  //{ path: ':id/editx', component: ProductFormPage }
];