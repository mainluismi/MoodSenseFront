import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminComponent implements OnInit {
  listaUsuarios: any[] = [];
  descripcion: string = 'Contiene el formulario o la interfaz para agregar nuevas ofertas de trabajo. Los administradores pueden utilizar este formulario para ingresar detalles sobre nuevas oportunidades laborales que serán visualizadas por futuros trabajadores.';
  activeTab: string = 'addWorker';

  workerData = {
    name: '',
    surnames: '',
    email: '',
    job: '',
    telf: '',
    image: null
  };

  constructor(private usuarioService: UsuarioService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerListaUsuarios();
  }

  obtenerListaUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios: any[]) => {
        this.listaUsuarios = usuarios;
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }
    });
  }

  eliminarUsuario(email: string): void {
    this.usuarioService.eliminarUsuario(email).subscribe({
      next: () => {
        this.obtenerListaUsuarios();
      },
      error: (error: any) => {
        console.error('Error deleting user', error);
      }
    });
  }

  showTabContent(tabName: string) {
    this.activeTab = tabName;
    switch (tabName) {
      case 'addWorker':
        this.descripcion = 'Formulario para agregar nuevos trabajadores.';
        this.activeTab = 'addWorker';
        break;
      case 'searchWorker':
        this.descripcion = 'Formulario para buscar trabajadores.';
        this.activeTab = 'searchWorker';
        break;
      case 'editWorker':
        this.descripcion = 'Formulario para editar los datos de un trabajador existente.';
        this.activeTab = 'editWorker';
        break;
      case 'deleteWorker':
        this.descripcion = 'Formulario para eliminar trabajadores.';
        this.activeTab = 'deleteWorker';
        break;
      default:
        this.descripcion = 'Seleccione una opción para ver más detalles.';
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.workerData.name);
    formData.append('surnames', this.workerData.surnames);
    formData.append('email', this.workerData.email);
    formData.append('job', this.workerData.job);
    formData.append('telf', this.workerData.telf);
    if (this.workerData.image) {
      formData.append('image', this.workerData.image);
    }

    this.http.post('http://localhost:8181/api/employees/create', formData)
      .subscribe({
        next: (response) => {
          console.log('Employee created successfully', response);
          this.obtenerListaUsuarios();  // Refrescar la lista de usuarios después de agregar
        },
        error: (error) => {
          console.error('Error creating employee', error);
        }
      });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.workerData.image = event.target.files[0];
    }
  }
}
