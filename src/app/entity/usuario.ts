export class Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    codigoVerificacion: string;
    verificado: boolean;
  
    constructor(
      id: number,
      nombre: string,
      apellidos: string,
      email: string,
      password: string,
      codigoVerificacion: string,
      verificado: boolean
    ) {
      this.id = id;
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.email = email;
      this.password = password;
      this.codigoVerificacion = codigoVerificacion;
      this.verificado = verificado;
    }
  }
  