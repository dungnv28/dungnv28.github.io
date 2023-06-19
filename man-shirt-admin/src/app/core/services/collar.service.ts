import { Injectable } from "@angular/core";
import {  collar } from "../models/collar.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CollarService {
  colLar: collar;
  constructor(private http: HttpClient) {}

  getCollar(): Observable<collar[]> {
    return this.http.get<collar[]>(`${environment.apiUrl}/collar/findAll`);

  }

  createCollar(colLar: collar): Observable<collar> {
    return this.http.post<collar>(
      `${environment.apiUrl}/collar/create`,
      colLar
    );
  }

  updateCollar(colLar: collar): Observable<collar> {
    return this.http.post<collar>(
      `${environment.apiUrl}/collar/update`,
      colLar
    );
  }
  deleteCollar(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/collar/delete?id=${id}`
    );
  }
}
