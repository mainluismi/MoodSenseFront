import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  email: string;
  password: string;
  errorMessage: string;
  subscription: Subscription | undefined;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }

  iniciarSesion() {
    // Enviar la solicitud HTTP POST al backend con el email y la contraseña
    this.subscription = this.usuarioService.iniciarSesion(this.email, this.password)
      .subscribe({
        next: (response: any) => {
          if (response.isAdmin === true) {
              this.router.navigate(['/admin-panel']);
          } else {
              this.router.navigate(['/inicio-sesion']);
          }
      }
      ,
        error: (error: any) => {
          // Manejar el error de inicio de sesión
          console.error('Error al iniciar sesión:', error);
          // Mostrar el mensaje de error recibido del backend
          this.errorMessage = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
        }
      });
  }
  
  crearCuenta() {
    // Redirigir al usuario a la página de registro, por ejemplo, '/registro'
    this.router.navigate(['/registro']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
