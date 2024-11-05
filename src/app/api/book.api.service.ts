import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class BookApiService {
  private apiRoute: string = `${environment.apiUrl}/api/books`;

  constructor(private http: HttpClient) {}

  createBook(payload: CreateBookPayload): Observable<Object> {
    return this.http.post(this.apiRoute, payload);
  }
}

type CreateBookPayload = {
  name: string;
  description: string;
}