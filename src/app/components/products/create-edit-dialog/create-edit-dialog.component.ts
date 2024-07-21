import { Component, Inject, OnInit } from '@angular/core';
import { Product, ProfileTypeEnum } from '../product';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductForm, productFormFactory } from './product-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-edit-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './create-edit-dialog.component.html',
  styleUrl: './create-edit-dialog.component.scss',
})
export class CreateEditDialogComponent implements OnInit {
  protected productForm: ProductForm;
  protected readonly action = this.product?.id ? 'Edit' : 'Create';
  protected types = Object.values(ProfileTypeEnum);
  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product?: Product
  ) {
    this.productForm = productFormFactory(fb, product ?? null);
  }

  get name() {
    return this.productForm.controls.name;
  }

  get description() {
    return this.productForm.controls.description;
  }

  get sku() {
    return this.productForm.controls.sku;
  }

  get cost() {
    return this.productForm.controls.cost;
  }

  get type() {
    return this.productForm.controls.profile.controls.type;
  }

  get available() {
    return this.productForm.controls.profile.controls.available;
  }

  ngOnInit(): void {
    if (this.product) {
      this.sku.disable();
    }
  }
}
