export class Documento {
    ano: number;
    assunto: string;
    autor: string;
    biblioteca: Biblioteca;
    categoria: Categoria;
    titulo: string;

    constructor() {
        this.biblioteca = new Biblioteca();
    }
}

export class Biblioteca {
    endereco: string;
    instituicao: string;
    lat: number;
    lng: number;
    nome: string;
    url: string;
    distance?: number;
}

export enum Categoria {
    LIVRO = 'LIVRO',
    PRODUCAO_ACADEMICA = 'PRODUCAO_ACADEMICA'
}