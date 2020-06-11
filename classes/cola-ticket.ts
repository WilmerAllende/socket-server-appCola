import { Ticket } from "./ticket";
export class Cola {
  public tickets: Ticket[] = [];

  constructor() {}

  //Obtener lista de tickets
  public getLista() {
    return this.tickets;
  }
  public getListaAtendiendo() {
    let copiTicket = [...this.tickets];
    let ticketsOrden = copiTicket.sort((a, b) => {
      //ORDENAR DE MAYOR A MENOR ( < , >) si fuera el caso de MENOR A MAYOR ( > , <)
      if (a.codigo < b.codigo) {
        return 1;
      }
      if (a.codigo > b.codigo) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    return ticketsOrden
      .filter((ticket) => {
        return ticket.estado === 2;
      })
      .splice(0, 4);
  }

  public getUltimoTicket() {
    if (this.tickets.length > 0) {
      return this.tickets[this.tickets.length - 1];
    }
  }

  public agregarTicket() {
    let codUltimo: number = 0;
    if (this.tickets.length > 0) {
      codUltimo = this.tickets[this.tickets.length - 1].codigo;
    }

    const nuevoTicket: Ticket = new Ticket(codUltimo + 1);
    this.tickets.push(nuevoTicket);
    return nuevoTicket;
  }
  public atenderTicket(escritorio: string) {
    //let estado = false;
    for (const i in this.tickets) {
      if (
        this.tickets[i].estado === 2 &&
        this.tickets[i].escritorio === escritorio
      ) {
        this.tickets[i].estado = 1;
        break;
      }
    }

    for (const i in this.tickets) {
      if (this.tickets[i].estado === 0) {
        this.tickets[i].escritorio = escritorio;
        this.tickets[i].estado = 2;
        return this.tickets[i];
      }
    }
    //return estado;
  }

  public findTicketEscritorio(escritorio: string) {
    for (const i in this.tickets) {
      if (
        this.tickets[i].escritorio === escritorio &&
        this.tickets[i].estado === 2
      ) {
        return this.tickets[i];
      }
    }
  }

  public findTicket(codigo: number) {
    return this.tickets.find((ticket) => {
      return ticket.codigo === codigo;
    });
  }

  public finalizarTicket(codigo: number) {
    for (const i in this.tickets) {
      if (this.tickets[i].codigo === codigo) {
        this.tickets[i].estado = 1;
      }
    }
  }
}
