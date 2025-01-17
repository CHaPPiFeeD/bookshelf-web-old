import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { BookUserStatus } from "../components/book-card-list/book-card-list.enum";

@Injectable()
export class FileApiService {
  private apiRoute: string = `${environment.apiUrl}/api/files`;

  constructor(private http: HttpClient) { }

  getSignedUrl(fileId: string) {
    return this.http.get(`${this.apiRoute}/${fileId}/url`).pipe(map((res: any) => res.data));
  }
}
