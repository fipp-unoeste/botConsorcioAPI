import ConsorcioDB from "../DB/consorcioDB.js";

export default class Consorcio {
    
     #codigo;
    #veiculo;
    #plano;
    #valor_parcela;
    #imagem;

    constructor(codigo, veiculo, plano, valor_parcela, imagem) {
        this.#codigo = codigo;
        this.#veiculo = veiculo;
        this.#plano = plano;
        this.#valor_parcela = valor_parcela;
        this.#imagem = imagem;
    }

    get codigo() {
        return this.#codigo;
    }

    get veiculo() {
        return this.#veiculo;
    }

    get plano() {
        return this.#plano;
    }

    get valor_parcela() {
        return this.#valor_parcela;
    }

    get imagem() {
    return this.#imagem;
    }

     set codigo(codigo) {
        this.#codigo = codigo;
    }

    set veiculo(veiculo) {
        this.#veiculo = veiculo;
    }

    set plano(plano) {
        this.#plano = plano;
    }

    set valor_parcela(valor_parcela) {
        this.#valor_parcela = valor_parcela;
    }
    set imagem(imagem) {
    this.#imagem = imagem;
   }

     toJSON() {
        return {
            codigo: this.#codigo,
            veiculo: this.#veiculo,
            plano: this.#plano,
            valor_parcela: this.#valor_parcela,
            imagem: this.#imagem
        };
    }

    async consultar(){
        const consorcioDB = new ConsorcioDB();
        return await consorcioDB.consultar();
    }
}