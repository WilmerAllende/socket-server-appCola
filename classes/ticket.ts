export class Ticket {
  public codigo: number;
  public estado: number;
  public escritorio?: string;

  constructor(codigo: number) {
    this.codigo = codigo;
    this.estado = 0; //0: Pendiente 1: Pagado 2: Recibido por escritorio
    this.escritorio = "Sin escritorio";
  }
}
