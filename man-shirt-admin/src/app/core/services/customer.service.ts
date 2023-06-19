import { Injectable } from "@angular/core";
import {  color } from "../models/color.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ColorService {
  coLor: color;
  constructor(private http: HttpClient) {}

  getMaterial(): Observable<color[]> {
    return this.http.get<color[]>(`${environment.apiUrl}/color/findAll`);

  }

  createMaterial(coLor: color): Observable<color> {
    return this.http.post<color>(
      `${environment.apiUrl}/color/create`,
      coLor
    );
  }

  updateMaterial(coLor: color): Observable<color> {
    return this.http.post<color>(
      `${environment.apiUrl}/color/update`,
      coLor
    );
  }
  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/color/delete?id=${id}`
    );
  }
}
