export class EncuestaData {
  private valores: number[] = [4, 6, 5, 12];
  private preguntas: string[] = [
    "pregunta 1",
    "pregunta 2",
    "pregunta 3",
    "pregunta 4",
  ];

  constructor() {}

  getDataEncuesta() {
    return [{ data: this.valores, label: "Preguntas" }];
  }

  incrementarEncuesta(pregunta: string, valor: number) {
    pregunta = pregunta.toLowerCase().trim();
    for (let i in this.preguntas) {
      if (this.preguntas[i] === pregunta) {
        this.valores[i] += valor;
      }
    }
    return this.getDataEncuesta();
  }
}
