import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

Injectable({
  providedIn: 'root',
});
export class ProductsService {
  api = 'http://rest-items.research.cloudonix.io/items';
  http = inject(HttpClient);

  getProducts(): Observable<any> {
    return this.http.get(this.api);
  }

  addProduct(product: any): Observable<Product> {
    const json = JSON.stringify(product);
    return this.http.post<Product>(this.api, json);
  }

  editProduct(product: any): Observable<Product> {
    const api = `${this.api}/${product.id}`;
    const json = JSON.stringify(product);
    return this.http.put<Product>(api, json);
  }

  deleteProduct(id: number): Observable<null> {
    const api = `${this.api}/${id}`;
    return this.http.delete<null>(api);
  }
}
