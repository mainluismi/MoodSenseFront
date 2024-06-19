import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../entity/usuario';

@Component({
  selector: 'app-confirmacion-correo',
  templateUrl: './confirmacion-correo.component.html',
  styleUrls: ['./confirmacion-correo.component.css'],
})
export class ConfirmacionCorreoComponent implements OnInit {
  email: string = '';
  codigoVerificacion: string = '';
  error: string = '';
  confirmacionExitosa: boolean = false;
  usuario: Usuario | null = null;
  nombre: any;
  apellidos: any;
  password: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['usuario']) {
        this.usuario = JSON.parse(params['usuario']);
      }
    });
  }

  confirmarCorreo() {
    if (!this.usuario || !this.codigoVerificacion) {
      console.error('Falta el usuario o el código de verificación.');
      return;
    }

    const data = {
      email: this.usuario.email,
      codigoVerificacion: this.codigoVerificacion,
      nombre: this.usuario.nombre,
      apellidos: this.usuario.apellidos,
      password: this.usuario.password,
    };

    this.http
      .post<any>('http://localhost:8080/verificarCodigo', data)
      .subscribe({
        next: (response) => {
          if (
            response &&
            response.message &&
            response.message.includes('Código de verificación correcto.')
          ) {
            this.confirmacionExitosa = true;
            this.router.navigate(['/home']);
          } else {
            this.error = 'Código de verificación incorrecto.';
            this.confirmacionExitosa = false;
          }
        },
        error: (error) => {
          console.error('Error al verificar código:', error);
          this.error =
            'Error al verificar código. Por favor, inténtelo de nuevo.';
          this.confirmacionExitosa = false;
        },
      });
  }
}
