import { Component } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  email: string;
  password: string;
  errorMessage: string;
  subscription: Subscription | undefined;

  constructor(private adminService: AdminService, private router: Router) {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }

  iniciarSesion(){
    this.subscription = this.adminService.inicioSesionAdmin(this.email, this.password)
    .subscribe({
      next:(response:any) => {
        if(response.isAdmin === true){
          this.router.navigate(['admin-panel']);
        }else{
          this.errorMessage = 'Error al intentar iniciar sesión';
        }
      },
      error: (error:any) => {
        console.error('Error al iniciar sesión', error)
        this.errorMessage = 'Error al intentar iniciar sesión';
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
