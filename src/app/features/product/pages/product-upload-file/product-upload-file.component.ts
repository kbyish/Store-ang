import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service';
import { ProductData } from '../../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-product-upload',
    imports: [CommonModule],
    template: `
    <h2>Upload Product CSV</h2>
    <input type="file" accept=".csv" (change)="onFileSelected($event)" />
    @if (error)  {<div style="color:red">{{error}}</div>}
    @if (success){<div style="color:green">{{success}}</div>}
  `
})
export class ProductUploadComponent {
    error = '';
    success = '';

    constructor(private productService: ProductService) {
        console.log('product-upload:: start');
    }
    onFileSelected(event: any) {
        console.log('product-upload:: onFileSelected(): event =', event);

        const file: File = event.target.files[0];
        console.log('product-upload:: onFileSelected(): file =', file);
        if (!file) return;
        //this.productService.uploadCsv(file);


       this.productService.uploadCsv(file).subscribe({
            next: (data) => {
                // Handle successful data
                        console.log('product-upload:: onFileSelected(): data =', data);
            },
            error: (error: HttpErrorResponse) => {
                // Handle API error
                console.log('product-upload:: onFileSelected(): error =', error);
            },
            complete: () => {
                // Optional: Called when the Observable completes (e.g., after receiving data)
                         console.log('product-upload:: onFileSelected(): Api complete()', );
            }
        });
    }

    onFileSelected2(event: any) {
        // const file: File = event.target.files[0];
        // if (!file) return;

        // const reader = new FileReader();
        // reader.onload = (e: any) => {
        //   const text = e.target.result;
        //   const rows = text.split('\n');
        //   const products = rows
        //     .map((row: string) => row.split(','))
        //     .filter((row: string | any[]) => row.length >= 4)
        //     .map(([name, description, price, category]) => ({
        //       name: name.trim(),
        //       description: description.trim(),
        //       price: +price,
        //       category: category.trim()
        //     }));

        //   // Batch upload products
        //   Promise.all(products.map((p: ProductData) => this.productService.createProduct(p).toPromise()))
        //     .then(() => {
        //       this.success = 'Products uploaded successfully!';
        //       this.error = '';
        //     })
        //     .catch(err => {
        //       this.error = 'Error uploading products';
        //       this.success = '';
        //     });
        // };
        // reader.readAsText(file);
    }
}