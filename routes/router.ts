import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { Socket } from "socket.io";
import { UsuariosConectados } from "../sockets/socket";
import { GraficaData } from "../classes/grafica";
import { EncuestaData } from "../classes/encuesta";
import { Cola } from "../classes/cola-ticket";
import { Ticket } from "../classes/ticket";
const router = Router();
const grafica = new GraficaData();
const encuesta = new EncuestaData();
router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Todo esta bien!!",
  });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const des = req.body.des;
  const payload = { cuerpo, des };

  const server = Server.instance;
  server.io.emit("mensaje-nuevo", payload);

  res.json({
    ok: true,
    cuerpo,
    des,
  });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const des = req.body.des;
  const id = req.params.id;

  const payload = {
    cuerpo,
    des,
  };

  const server = Server.instance;
  server.io.in(id).emit("mensaje-privado", payload);

  res.json({
    ok: true,
    cuerpo,
    des,
    id,
  });
});

//Obtener usuarios conectados
router.get("/usuarios", (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      return res.json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      clientes,
    });
  });
});

//Obtener usuarios y nombres
router.get("/usuarios/detalle", (req: Request, res: Response) => {
  res.json({
    ok: true,
    clientes: UsuariosConectados.getLista(),
  });
});

//GRAFICA

router.get("/grafica", (req: Request, res: Response) => {
  res.json(grafica.getDataGrafica());
});

router.post("/grafica", (req: Request, res: Response) => {
  const mes = req.body.mes;
  const unidades = Number(req.body.unidades);
  grafica.incrementarValores(mes, unidades);

  const server = Server.instance;
  server.io.emit("cambio-grafica", grafica.getDataGrafica());

  res.json(grafica.getDataGrafica());
});

//ENCUESTA
router.get("/encuesta", (req: Request, res: Response) => {
  res.json(encuesta.getDataEncuesta());
});

router.post("/encuesta", (req: Request, res: Response) => {
  const pregunta = req.body.pregunta;
  const unidades = Number(req.body.unidades);
  encuesta.incrementarEncuesta(pregunta, unidades);

  const server = Server.instance;
  server.io.emit("cambio-encuesta", encuesta.getDataEncuesta());

  res.json(encuesta.getDataEncuesta());
});

//Parte de colas
export const cola = new Cola();

router.get("/tickets", (req: Request, res: Response) => {
  res.json(cola.getLista());
});

router.get("/ultimoTickets", (req: Request, res: Response) => {
  res.json(cola.getUltimoTicket());
});

router.get("/atenderTicket/:escritorio", (req: Request, res: Response) => {
  const tickect = cola.atenderTicket(req.params.escritorio);
  // Generar sockets para publico
  const server = Server.instance;
  server.io.emit("lista-tickets", cola.getListaAtendiendo());
  res.json(tickect);
});

router.get(
  "/findTicketEscritorio/:escritorio",
  (req: Request, res: Response) => {
    const ticket = cola.findTicketEscritorio(req.params.escritorio);
    res.json(ticket);
  }
);

export default router;
