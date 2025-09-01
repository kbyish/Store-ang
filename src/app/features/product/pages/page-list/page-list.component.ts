import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from "@angular/router";


import { Product } from '../../models/product.model'
import { ProductService } from "../../services/product-service";

@Component({
    selector: 'app-product-list',
    imports: [CommonModule, RouterModule],
    templateUrl: './page-list.component.html',
    styleUrl: './page-list.css'
})
export class ProductList implements OnInit {
    products: Product[] = [];
    constructor(private productService: ProductService) { }
    ngOnInit(): void {
        console.log('page-list::ngOnInit()');
        this.productService.getProducts()
            .subscribe(res => {
                console.log('age-list::ngOnInit:productsService.getProducts(): res =', res);
                this.products = res;
            }

            );
    }

    delete(id: number) {
        if (confirm('Delete this product?')) {
            this.productService.deleteProduct(id).subscribe(() => this.ngOnInit());
        }
    }
} 