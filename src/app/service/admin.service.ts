import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../entity/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  registrarAdmin(admin: Admin): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/guardarAdmin`, admin)
  }

  inicioSesionAdmin(email: string, password: string): Observable<Admin>{
    return this.http.post<Admin>(`${this.apiUrl}/inicioSesionAdmin`,{email,password})
  }
}
