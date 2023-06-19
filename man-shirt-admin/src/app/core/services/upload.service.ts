import { Injectable } from "@angular/core";
import { ImageUploadDto } from "../models/upload.models";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadImageByColor(imageFiles: File[]): Observable<{ imageIds: string[] }> {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("imageFiles", file, file.name);
    });
    return this.http.post<{ imageIds: string[] }>(
      `http://localhost:8080/image/upload`,
      formData
    );
  }
}
