import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { categoryRequest, categoryResponse } from "../models/category.models";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategory(): Observable<categoryResponse[]> {
    return this.http.get<categoryResponse[]>(
      `${environment.apiUrl}/category/findAll`
    );
  }

  createCategory(category: categoryRequest): Observable<categoryResponse> {
    return this.http.post<categoryResponse>(
      `${environment.apiUrl}/category/create`,
      category
    );
  }

  updateCategory(category: categoryRequest): Observable<categoryResponse> {
    return this.http.post<categoryResponse>(
      `${environment.apiUrl}/category/update`,
      category
    );
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/category/delete?id=${id}`);
  }
}
