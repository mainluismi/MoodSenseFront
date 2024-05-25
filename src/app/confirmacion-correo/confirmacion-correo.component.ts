import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmacion-correo',
  templateUrl: './confirmacion-correo.component.html',
  styleUrls: ['./confirmacion-correo.component.css']
})
export class ConfirmacionCorreoComponent {
  email: string = '';
  codigoVerificacion: string = '';
  error: string = '';
  confirmacionExitosa: boolean = false;

  constructor(private http: HttpClient) {}

  confirmarCorreo() {
    // Enviar la solicitud al backend para verificar el código
    this.http.post<any>('http://localhost:8080/verificarCodigo', { email: this.email, codigo: this.codigoVerificacion })
      .subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          // Verificar la respuesta del servidor
          if (response === 'Código de verificación correcto') {
            // Código de verificación correcto, mostrar mensaje de éxito
            this.confirmacionExitosa = true;
          } else {
            // Código de verificación incorrecto, mostrar mensaje de error
            this.error = 'Código de verificación incorrecto.';
          }
        },
        error => {
          console.error('Error al verificar código:', error);
          // Manejar errores de la solicitud HTTP, mostrar mensaje de error genérico
          this.error = 'Error al verificar código. Por favor, inténtelo de nuevo.';
        }
      );
  }
}
