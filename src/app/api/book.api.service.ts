import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { BookUserStatus } from "../components/book-card-list/book-card-list.enum";

@Injectable()
export class BookApiService {
  private apiRoute: string = `${environment.apiUrl}/api/books`;

  constructor(private http: HttpClient) { }

  createBook(payload: CreateBookPayload): Observable<Object> {
    return this.http.post(this.apiRoute, payload).pipe(map((res: any) => res.data));
  }

  getAllBooks(params: GetAllBooksQuery) {
    return this.http.get(this.apiRoute, { params }).pipe(map((res: any) => res.data));
  }

  uploadCover(bookId: string, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiRoute}/${bookId}/cover/upload`, formData).pipe(map((res: any) => res.data));
  }
}

export type GetAllBooksQuery = {
  user_id?: string;
  book_user_status?: BookUserStatus;
}

type CreateBookPayload = {
  name: string;
  description: string;
}