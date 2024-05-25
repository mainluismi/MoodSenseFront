import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminComponent } from './admin-panel/admin-panel.component';
import { ConfirmacionCorreoComponent } from './confirmacion-correo/confirmacion-correo.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormComponent } from './form/form.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }
  ,{
    path: 'home', component: HomeComponent
  },
  {
    path: 'registro', component: RegistroComponent
  },
  {
    path: 'admin-panel', component: AdminComponent
  },
  {
    path: 'confirmar-correo', component: ConfirmacionCorreoComponent
  },
  {
    path: 'inicio-sesion', component: InicioComponent
  },
  {
    path: 'crear-oferta', component: FormComponent
  },
  {
    path: 'home-admin', component: HomeAdminComponent
  },
  {
    path: '**', redirectTo: '/home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
