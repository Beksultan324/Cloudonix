import { FormBuilder, Validators } from '@angular/forms';
import { Product, ProfileTypeEnum } from '../product';

export function productFormFactory(fb: FormBuilder, product: Product | null) {
  return fb.group({
    id: [product?.id ?? null],
    name: [product?.name ?? null, [Validators.required]],
    description: [product?.description ?? null, [Validators.required]],
    sku: [product?.sku ?? null, [Validators.required]],
    cost: [
      product?.cost ?? null,
      [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    profile: fb.group({
      type: [product?.profile?.type ?? ProfileTypeEnum.Furniture],
      available: [product?.profile?.available ?? true],
    }),
  });
}

export type ProductForm = ReturnType<typeof productFormFactory>;
