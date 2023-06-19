import { Injectable } from "@angular/core";
import {  employeeRespone,employeeRequest } from "../models/employee.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getMaterial(): Observable<employeeRespone[]> {
    return this.http.get<employeeRespone[]>(`${environment.apiUrl}/color/getAll`);

  }

  // createMaterial(coLor: color): Observable<color> {
  //   return this.http.post<color>(
  //     `${environment.apiUrl}/color/create`,
  //     coLor
  //   );
  // }

  // updateMaterial(coLor: color): Observable<color> {
  //   return this.http.post<color>(
  //     `${environment.apiUrl}/color/update`,
  //     coLor
  //   );
  // }
  // deleteMaterial(id: number): Observable<any> {
  //   return this.http.delete(
  //     `${environment.apiUrl}/color/delete?id=${id}`
  //   );
  // }
}
