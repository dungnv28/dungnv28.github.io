import { Injectable } from "@angular/core";
import {  contactResponse,contactRequest } from "../models/contact.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ContactService {

  constructor(private http: HttpClient) {}

  getContact(): Observable<contactResponse[]> {
    return this.http.get<contactResponse[]>(`${environment.apiUrl}/contact/findAll`);

  }

  createContact(contact: contactRequest): Observable<contactResponse> {
    return this.http.post<contactResponse>(
      `${environment.apiUrl}/contact/create`,
      contact
    );
  }

  updateContact(contact: contactRequest): Observable<contactResponse> {
    return this.http.post<contactResponse>(
      `${environment.apiUrl}/contact/update`,
      contact
    );
  }
  deleteContact(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/contact/delete?id=${id}`
    );
  }
}
