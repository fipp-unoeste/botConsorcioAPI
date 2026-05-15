import obterConexao from "./conexao.js";
import Consorcio from "../models/consorcio.js";

export default class ConsorcioDB{

    async consultar(){
        const conexao = await obterConexao();
        const sql = 'SELECT * FROM consorcio';
        const [resultados, campos ] =  await conexao.query(sql);
        const listaConsorcios = [];
        for(const resultado of resultados){
            const con = new Consorcio(
                resultado.codigo,
                resultado.veiculo,
                resultado.plano,
                resultado.valor_parcela,
                resultado.imagem
            )
            listaConsorcios.push(con);
        }
        return listaConsorcios;
    }
}