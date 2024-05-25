export class Admin {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
  
    constructor(
      id: number,
      nombre: string,
      apellidos: string,
      email: string,
      password: string,
    ) {
      this.id = id;
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.email = email;
      this.password = password;
    }
  }
  