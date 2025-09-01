import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-product-form',
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>Name: <input formControlName="name" /></label><br />
      <label>Description: <input formControlName="description" /></label><br />
      <label>Price: <input formControlName="price" type="number" /></label><br />
      <label>Category: <input formControlName="category" /></label><br />
      <button type="submit">{{isEdit ? 'Update' : 'Create'}} Product</button>
    </form>
  `
})
export class ProductFormComponent implements OnInit {
    form: FormGroup;

    isEdit = false;
    id!: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {
        this.form = this.fb.group({
            name: [''],
            description: [''],
            price: [0],
            category: ['']
        });
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;
        if (this.id) {
            this.isEdit = true;
            this.productService.getProduct(+this.id).subscribe(product => this.form.patchValue(product));
        }
    }

    submit() {
        if (this.form.valid) {
            if (this.isEdit) {
                this.productService.updateProduct(+this.id, this.form.value).subscribe(() => this.router.navigate(['/products']));
            } else {
                this.productService.createProduct(this.form.value).subscribe(() => this.router.navigate(['/products']));
            }
        }
    }
}