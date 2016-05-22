export class Page {
    id: number;
	slug: string;
    titulo: string;
	texto: string;
    html: string;
    midia: string;
	apps: any[];

    constructor(
        id: number,
        slug: string,
        titulo: string,
        texto: string,
        html: string,
        midia: string,
		apps: any[]
    ){
        this.id = id;
        this.slug = slug;
        this.titulo = titulo;
        this.texto = texto;
        this.html = html;
        this.midia = midia;
		this.apps = apps;
    }
}