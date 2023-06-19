import { Injectable } from "@angular/core";
import { OsType } from "../models/osType.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OsTypeService {
  osType: OsType;
  constructor(private http: HttpClient) {}

  getOsTypes(): Observable<OsType[]> {
    return this.http.get<OsType[]>(`${environment.apiUrl}/OsType/getList`);
  }

  createOsType(osType: OsType): Observable<OsType> {
    return this.http.post<OsType>(
      `${environment.apiUrl}/OsType/createOsType`,
      osType
    );
  }

  updateOsType(osType: OsType): Observable<OsType> {
    return this.http.put<OsType>(
      `${environment.apiUrl}/OsType/updateOsType`,
      osType
    );
  }
  deleteOsType(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/OsType/deleteOsType?id=${id}`
    );
  }
}
