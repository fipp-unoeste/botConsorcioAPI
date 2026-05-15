import Consorcio from "../models/consorcio.js";


export default class ConsorcioCtrl{

    async consultar(req, res){

        if(req.method == "GET"){
            const consorcio = new Consorcio();

            consorcio.consultar()
            .then((listaConsorcios)=>{
                res.status(200).json({
                    status: "true",
                    consorcios: listaConsorcios
                })
            })
            .catch((erro) =>{
                res.status(500).json({
                    status: "false",
                    mensagem: erro.message
                })
            });
        }
        else{
            res.status(405).json({
                statys: false,
                mensagem: "metodo nao permitido"
            });
        }
    }
}