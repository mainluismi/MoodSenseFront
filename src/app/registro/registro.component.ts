import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../entity/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  error: boolean = false;
  registrando: boolean = false;
  codigoVerificacion: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  registrarUsuario() {
    if (this.registrando) {
      // Evita hacer múltiples solicitudes si ya se está registrando
      return;
    }

    this.registrando = true;

    if (this.nombre === '' || this.apellidos === '' || this.email === '' || this.password === '') {
      this.error = true;
      this.registrando = false;
      return;
    }

    const usuario: Usuario = {
      id: 0,
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      codigoVerificacion: '',
      verificado: false
    };

    this.http.post<any>('http://localhost:8080/enviarCodigo', usuario).subscribe({
    next: response => {
        if (response && response.message && response.message.includes('Código de verificación enviado correctamente.')) {
            this.error = false;
            this.router.navigate(['/confirmar-correo'], { queryParams: { usuario: JSON.stringify(usuario) }});
        } else {
            this.error = true;
        }
    },
    error: error => {
        console.error('Error al enviar el código de verificación:', error);
        this.error = true;
    }
});
  }
}
