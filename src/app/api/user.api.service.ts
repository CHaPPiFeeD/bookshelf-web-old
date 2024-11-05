import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";

@Injectable()
export class UserApiService {
  private apiRoute: string = `${environment.apiUrl}/api/users`

  constructor(private http: HttpClient) { }

  getUserProfile(id: string): Observable<IGetUserProfile> {
    return this.http.get(`${this.apiRoute}/${id}`)
      .pipe(map((v: any) => v.data));
  }

  getUsers(query: IGetUsersQuery): Observable<IGetUsersRes[]> {
    return this.http.get(this.apiRoute, { params: query as any })
      .pipe(map((v: any) => v.data as IGetUsersRes[]));
  }

  updateUser(id: string, payload: IUpdateUserPayload): Observable<Object> {
    return this.http.put(`${this.apiRoute}/${id}`, payload);
  }
}

interface IGetUsersQuery {
  email: string;
}

export interface IGetUserProfile {
  id: string;
  name: string;
  description: null | string;
  books_count: number;
}

export interface IUpdateUserPayload {
  name: string;
  description: string;
}

export interface IGetUsersRes {
  id: string;
  name: string;
  email: string;
  description: null | string;
  is_active: boolean;
  created_at: string;
}
