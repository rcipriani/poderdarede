export class Chamada {
    id: number;
    titulo: string;
    texto: string;
    midia: string;
    aceitaInscricao: boolean;

    constructor(
        id: number,
        titulo: string,
        texto: string,
        midia: string,
        aceitaInscricao: boolean
    ){
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.midia = midia;
        this.aceitaInscricao = aceitaInscricao;
    }
}