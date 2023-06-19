import { Injectable } from "@angular/core";
import { material } from "../models/material.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MaterialService {
  mateRial: material;
  constructor(private http: HttpClient) {}

  getMaterial(): Observable<material[]> {
    return this.http.get<material[]>(`${environment.apiUrl}/material/findAll`);
  }

  createMaterial(mateRial: material): Observable<material> {
    return this.http.post<material>(
      `${environment.apiUrl}/material/create`,
      mateRial
    );
  }

  updateMaterial(mateRial: material): Observable<material> {
    return this.http.post<material>(
      `${environment.apiUrl}/material/update`,
      mateRial
    );
  }
  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/material/delete?id=${id}`);
  }
}
