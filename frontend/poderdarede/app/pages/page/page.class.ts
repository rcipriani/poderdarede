export class Page {
    id: number;
    slug: string;
    titulo: string;
    texto: string;
    html: string;
    midia: string;

    constructor(
        id: number,
        slug: string,
        titulo: string,
        texto: string,
        html: string,
        midia: string
    ) {
        this.id = id;
        this.slug = slug;
        this.titulo = titulo;
        this.texto = texto;
        this.html = html;
        this.midia = midia;
    }
}
