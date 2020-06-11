import { Usuario } from "./usuario";

export class UsuariosLista {
  private lista: Usuario[] = [];
  constructor() {}

  //Agregar usuario
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
  }

  //Actualizar nombre de usuario
  public actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log(" === Actualizando usuario ===");
    console.log(this.lista);
  }

  //Obtener lista de usuarios
  public getLista() {
    return this.lista.filter((usuario) => {
      return usuario.nombre !== "Sin-nombre";
    });
  }

  //Buscar usuario
  public getUsuario(id: string) {
    return this.lista.find((usuario) => {
      return usuario.id === id;
    });
  }

  //Otener usuarios en una sala en particular
  public getUsuariosEnSala(sala: string) {
    return this.lista.filter((usuario) => {
      return usuario.sala === sala;
    });
  }

  //Borrar un usuario
  public borrarUsuario(id: string) {
    const tempUsuario = this.getUsuario(id);

    this.lista = this.lista.filter((usuario) => {
      return usuario.id !== id;
    });
    return tempUsuario;
  }
}
