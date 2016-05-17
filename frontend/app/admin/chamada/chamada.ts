export class Chamada {
    id: number;
    slug: string;
    titulo: string;
    texto: string;
    midia: string;
    aceitaInscricao: boolean;

    constructor(
        id: number,
        slug: string,
        titulo: string,
        texto: string,
        midia: string,
        aceitaInscricao: boolean
    ){
        this.id = id;
        this.slug = slug;
        this.titulo = titulo;
        this.texto = texto;
        this.midia = midia;
        this.aceitaInscricao = aceitaInscricao;
    }
}
