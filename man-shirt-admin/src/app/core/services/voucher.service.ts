import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { voucherRequest, voucherResponse } from "../models/voucher.models";

@Injectable({
  providedIn: "root",
})
export class VoucherService {
  constructor(private http: HttpClient) {}

  getMaterial(): Observable<voucherResponse[]> {
    return this.http.get<voucherResponse[]>(
      `${environment.apiUrl}/voucher/findAll`
    );
  }

  createMaterial(voucher: voucherRequest): Observable<voucherResponse> {
    return this.http.post<voucherResponse>(
      `${environment.apiUrl}/voucher/create`,
      voucher
    );
  }

  updateMaterial(voucher: voucherRequest): Observable<voucherResponse> {
    return this.http.post<voucherResponse>(
      `${environment.apiUrl}/voucher/update`,
      voucher
    );
  }
  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/voucher/delete?id=${id}`);
  }
}
