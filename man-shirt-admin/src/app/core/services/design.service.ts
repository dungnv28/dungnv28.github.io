import { Injectable } from "@angular/core";
import {  design } from "../models/design.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DesignService {
  deSign: design;
  constructor(private http: HttpClient) {}

  getDesign(): Observable<design[]> {
    return this.http.get<design[]>(`${environment.apiUrl}/design/findAll`);

  }

  createDesign(deSign: design): Observable<design> {
    return this.http.post<design>(
      `${environment.apiUrl}/design/create`,
      deSign
    );
  }

  updateDesign(deSign: design): Observable<design> {
    return this.http.post<design>(
      `${environment.apiUrl}/design/update`,
      deSign
    );
  }
  deleteDesign(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/design/delete?id=${id}`
    );
  }
}
