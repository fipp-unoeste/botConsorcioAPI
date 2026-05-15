import obterConexao from "./conexao.js";

export default class ConsorcioDB{

    async consultar(){
        const conexao = await obterConexao();
        const sql = 'SELECT * FROM consorcio';
        const [resultados, campos ] =  await conexao.query();
        const listaConsorcios = [];
        for(const resultado of resultados){
            const consorcio = new Consorcio(
                resultado.codigo,
                resultado.veiculo,
                resultado.plano,
                resultado.valor_parcela,
                resultado.imagem
            )
            listaConsorcios.push(consorcio);
        }
        return listaCorsorcios;
    }
}