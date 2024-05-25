import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entity/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080'; // Ajusta la URL de acuerdo a tu backend

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardarUsuario`, usuario);
  }

  verificarCodigo(email: string, codigo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verificarCodigo`, { email, codigo });
  }

  confirmarCorreo(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verificarCodigo`, usuario);
  }

  iniciarSesion(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/inicioSesion`, { email, password });
  }

  eliminarUsuario(email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/${email}`);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`); // Ajusta la URL según tu endpoint en el backend
  }

  guardarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/guardarUsuario`, usuario);
  }

  generateForm(questions: string[]): Observable<string> {
    return this.http.post<string>('/api/generate-form', questions);
  }

}