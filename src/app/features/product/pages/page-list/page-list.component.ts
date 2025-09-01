import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common'; // Import CommonModule


import { Product } from '../../models/product.model'
import { ProductService } from "../../services/product-service";

@Component({
    selector: 'app-product-list',
    imports:[CommonModule],
    templateUrl: './page-list.component.html',
    styleUrl: './page-list.css'
})
export class ProductList implements OnInit {
    products: Product[] = [];
    constructor(private productsService: ProductService) { }
    ngOnInit(): void {
        console.log('page-list::ngOnInit()');
        this.productsService.getProducts()
        .subscribe(res => 
            {
                console.log('age-list::ngOnInit:productsService.getProducts(): res =', res);
                this.products = res;
            }

        );
    }
} 