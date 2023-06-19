import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ProductRequest, ProductRespone } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  productRequest: ProductRequest;
  constructor(private http: HttpClient) {}

  createProduct(productRequest: ProductRequest): Observable<ProductRespone> {
    return this.http.post<ProductRespone>(
      `${environment.apiUrl}/product/savePDI`,
      productRequest
    );
  }
  getProduct(): Observable<ProductRespone[]> {
    return this.http.get<ProductRespone[]>(
      `${environment.apiUrl}/product/getAll`
    );
  }
}
