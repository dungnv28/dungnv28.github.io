import { Injectable } from "@angular/core";
import {  form } from "../models/form.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FormService {
  foRm: form;
  constructor(private http: HttpClient) {}

  getForm(): Observable<form[]> {
    return this.http.get<form[]>(`${environment.apiUrl}/form/findAll`);

  }

  createForm(foRm: form): Observable<form> {
    return this.http.post<form>(
      `${environment.apiUrl}/form/create`,
      foRm
    );
  }

  updateForm(foRm: form): Observable<form> {
    return this.http.post<form>(
      `${environment.apiUrl}/form/update`,
      foRm
    );
  }
  deleteForm(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/form/delete?id=${id}`
    );
  }
}
