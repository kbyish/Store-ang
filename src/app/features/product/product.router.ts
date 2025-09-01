import { Routes } from '@angular/router';
import { ProductList } from '../product/pages/page-list/page-list.component';
import { ProductDetailComponent } from './pages/product-details/product-details.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';


export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductList },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: ':id', component: ProductDetailComponent },
  { path: ':id/edit', component: ProductFormComponent }
];