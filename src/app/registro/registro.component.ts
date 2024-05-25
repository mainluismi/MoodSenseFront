import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  error: boolean = false;
  subscription!: Subscription;

  constructor(private router: Router, private http: HttpClient) {
    this.nombre = '';
    this.apellidos = '';
    this.email = '';
    this.password = '';
  }

  registrarUsuario() {
    if (this.nombre === '' || this.apellidos === '' || this.email === '' || this.password === '') {
      this.error = true;
      return; // Detener el proceso si hay campos vacíos
    }

    // Verificar si el correo ya está registrado en la base de datos
    this.subscription = this.http.post<any>('http://localhost:8080/confirmarCorreo', { email: this.email })
      .subscribe({
        next: response => {
          if (response && response.error) {
            // El correo ya está registrado
            this.error = true;
          } else {
            // El correo no está registrado, continuar con el proceso de registro
            this.error = false;
            this.router.navigate(['/confirmar-correo']);
          }
        },
        error: error => {
          console.error('Error al verificar el correo:', error);
          // Manejar cualquier error de conexión u otros errores
          // Aquí puedes mostrar un mensaje de error al usuario si es necesario
        }
      });
  }

  ngOnDestroy() {
    // Cancelar la suscripción para evitar fugas de memoria
    this.subscription.unsubscribe();
  }
}
