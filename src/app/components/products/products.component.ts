import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductsTableComponent } from './products-table/products-table.component';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ProductsService } from './products.service';
import { ELEMENT_DATA, Product } from './product';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CreateEditDialogComponent } from './create-edit-dialog/create-edit-dialog.component';
import { ShowDetailDialogComponent } from './show-detail-dialog/show-detail-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, ProductsTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService],
})
export class ProductsComponent {
  private readonly destroy = new Subject<void>();
  private readonly productsService = inject(ProductsService);
  private readonly matDialog = inject(MatDialog);

  protected products = ELEMENT_DATA;

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe((products) => (this.products = products));
  }

  protected add() {
    this.openCreateEditDialog()
      .pipe(
        switchMap((product) => {
          if (product) {
            const data = {
              name: product.name,
              description: product.description,
              sku: product.sku,
              cost: Number(product.cost),
              profile: {
                type: product.profile?.type,
                available: product.profile?.available,
              },
            };
            return this.productsService.addProduct(data);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.getProducts());
  }

  protected edit(product: Product) {
    this.openCreateEditDialog(product)
      .pipe(
        switchMap((product) => {
          if (product) {
            const data = {
              id: product.id,
              name: product.name,
              description: product.description,
              sku: product.sku,
              cost: Number(product.cost),
              profile: {
                type: product.profile?.type,
                available: product.profile?.available,
              },
            };

            return this.productsService.editProduct(data);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.getProducts());
  }

  protected delete(product: Product) {
    this.openConfirmDialog(product.name)
      .pipe(
        switchMap((res) => {
          if (res) {
            return this.productsService.deleteProduct(product.id);
          } else {
            return of(null);
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe(() => this.getProducts());
  }

  protected openShowDetailDialog(product: Product) {
    this.matDialog.open(ShowDetailDialogComponent, {
      data: product,
      width: '500px',
    });
  }

  private openCreateEditDialog(product?: Product): Observable<Product> {
    const dialogRef = this.matDialog.open(CreateEditDialogComponent, {
      data: product,
      width: '500px',
    });

    return dialogRef.afterClosed();
  }

  private openConfirmDialog(productName: string): Observable<any> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: productName,
      width: '250px',
    });

    return dialogRef.afterClosed();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
