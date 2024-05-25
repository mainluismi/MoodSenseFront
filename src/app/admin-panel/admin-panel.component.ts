import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../entity/usuario';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminComponent  {
  listaUsuarios: any[] | undefined; // Ajusta el tipo según la estructura de tu usuario

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerListaUsuarios();
  }

  obtenerListaUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.listaUsuarios = usuarios;
      },
      (error: any) => { // Especifica el tipo del parámetro error
        console.error('Error fetching users', error);
      }
    );
  }

  eliminarUsuario(email: string): void {
    this.usuarioService.eliminarUsuario(email).subscribe(() => {
      this.obtenerListaUsuarios();
    });
  }
}
