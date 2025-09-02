import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-product-form',
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './product-form.component.html'
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
        console.log('product-form:: ngOnInit()');
        this.id = this.route.snapshot.paramMap.get('id')!;
        console.log('product-form:: ngOnInit(): this.id =', this.id);
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