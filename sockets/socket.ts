import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";
import { cola } from "../routes/router";
import { Ticket } from "../classes/ticket";

export const UsuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  UsuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");
    UsuariosConectados.borrarUsuario(cliente.id);

    io.emit("usuarios-activos", UsuariosConectados.getLista());
  });
};

//Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log("Mensaje recibido: ", payload);
    io.emit("mensaje-nuevo", payload);
  });
};

//Configurar usuario - login
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on(
    "configurar-usuario",
    (payload: { nombre: string }, callback: Function) => {
      //console.log("usuario configurado recibido: ", payload);
      UsuariosConectados.actualizarNombre(cliente.id, payload.nombre);
      io.emit("usuarios-activos", UsuariosConectados.getLista());
      //io.emit("mensaje-nuevo", payload);
      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre} configurado`,
      });
    }
  );
};

//Obtener usuarios

export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("obtener-usuarios", () => {
    io.to(cliente.id).emit("usuarios-activos", UsuariosConectados.getLista());
  });
};

// COLAS DE TOCKETS
export const agregarTicket = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("agregar-ticket", () => {
    const ticketNuevo: Ticket = cola.agregarTicket();
    io.emit("agregar-ticket", ticketNuevo);
  });
};
