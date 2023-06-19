import { Injectable } from "@angular/core";
import { size } from "../models/size.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SizeService {
  siZe: size;
  constructor(private http: HttpClient) {}

  getSize(): Observable<size[]> {
    return this.http.get<size[]>(`${environment.apiUrl}/size/findAll`);
  }

  createSize(siZe: size): Observable<size> {
    return this.http.post<size>(`${environment.apiUrl}/size/create`, siZe);
  }

  updateSize(siZe: size): Observable<size> {
    return this.http.post<size>(`${environment.apiUrl}/size/update`, siZe);
  }

  deleteSize(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/size/delete?id=${id}`);
  }
}
