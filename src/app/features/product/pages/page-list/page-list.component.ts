import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterLink } from "@angular/router";


import { Product } from '../../models/product.model'
import { ProductService } from "../../services/product-service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-product-list',
    imports: [CommonModule, RouterLink],
    templateUrl: './page-list.component.html',
    styleUrl: './page-list.css'
})
export class ProductList implements OnInit {
    products: Product[] = [];
    products$!: Observable<any>;
    constructor(private productService: ProductService) { }
    ngOnInit(): void {
        console.log('page-list::ngOnInit()');
        this.products$ = this.productService.getProducts();
    }

    delete(id: number) {
        if (confirm('Delete this product?')) {
            this.productService.deleteProduct(id).subscribe(() => this.ngOnInit());
        }
    }
} 