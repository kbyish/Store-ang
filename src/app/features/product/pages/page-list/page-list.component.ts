import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterLink } from "@angular/router";

import { ProductService } from "../../services/product-service";
import { Observable } from "rxjs";
import { Product } from "../../models/product.model";

@Component({
    selector: 'app-product-list',
    imports: [CommonModule, RouterLink],
    templateUrl: './page-list.component.html',
    styleUrl: './page-list.css'
})
export class ProductList implements OnInit {
    products:Product[]=[];
    products$!: Observable<any>;
    constructor(private productService: ProductService, private cdr: ChangeDetectorRef) { }
    ngOnInit(): void {
        console.log('page-list::ngOnInit()');
        // this.productService.getProducts().subscribe((data)=>{
        //      console.log('page-list::ngOnInit()  data=', data);
        //     this.products = data;
        //     this.cdr.detectChanges();
        // });
        this.products$ = this.productService.getProducts();
        this.cdr.detectChanges();
     }

    delete(id: number) {
        if (confirm('Delete this product?')) {
            this.productService.deleteProduct(id).subscribe(() => this.ngOnInit());
        }
    }
} 