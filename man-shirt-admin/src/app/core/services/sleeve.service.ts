import { Injectable } from "@angular/core";
import { sleeve } from "../models/sleeve.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SleeveService {
  sleeVe: sleeve;
  constructor(private http: HttpClient) {}

  getSleeve(): Observable<sleeve[]> {
    return this.http.get<sleeve[]>(`${environment.apiUrl}/sleeve/findAll`);
  }

  createSleeve(sleeVe: sleeve): Observable<sleeve> {
    return this.http.post<sleeve>(
      `${environment.apiUrl}/sleeve/create`,
      sleeVe
    );
  }

  updateSleeve(sleeVe: sleeve): Observable<sleeve> {
    return this.http.post<sleeve>(
      `${environment.apiUrl}/sleeve/update`,
      sleeVe
    );
  }
  deleteSleeve(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/sleeve/delete?id=${id}`);
  }
}
