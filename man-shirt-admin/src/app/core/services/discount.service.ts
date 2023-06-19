import { Injectable } from "@angular/core";
import { discount } from "../models/discount.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DiscountService {
  // disCount: discount;
  constructor(private http: HttpClient) {}

  getDiscount(): Observable<discount[]> {
    return this.http.get<discount[]>(`${environment.apiUrl}/discount/findAll`);
  }

  createDiscount(disCount: discount): Observable<discount> {
    return this.http.post<discount>(
      `${environment.apiUrl}/discount/create`,
      disCount
    );
  }

  updateDiscount(disCount: discount): Observable<discount> {
    return this.http.post<discount>(
      `${environment.apiUrl}/discount/update`,
      disCount
    );
  }

  deleteDiscount(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/discount/delete?id=${id}`);
  }
}
