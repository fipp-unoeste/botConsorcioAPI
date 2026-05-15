import obterCardsConsorcios from "../Dialogflow/funcoes.js";
import { apresentarMenu } from "../Dialogflow/funcoes.js";

export default class DFCtrl{

    async obterCardsConsorcio(req, res){
        if(req.method== "GET"){
            obterCardsConsorcios("custom")
            .then((cards) => {
                res.status(200).json(cards);
            }).
            catch((erro) => {
                res.status(500).json({
                    status: "false",
                    mensagem: erro.message
                });
            });
        }
    }


    async processarIntents(req, res){
        if(req.method == "POST" && req.is("application/json")){
            let resposta = {};
            const dados = req.body;
            let origem = dados?.originalDetectIntentRequest?.source;
            if(origem){
                origem = "custom";
            }
            const intencao = dados?.queryResult?.intent?.displayName;
            switch(intencao){
                case "EscolherVeiculo":
                    resposta = await apresentarMenu(origem);
                    break;
                case "EscolherPlano":
                    const veiculo = dados?.queryResult?.parameters?.veiculo;
                    resposta = await apresentarPlanos(veiculo, origem);  
                    break;    
            }
            res.json(resposta);
        }
        else{
            res.status(405).json({
                status: "false",
                mensagem: "Metodo nao permitido"
            })
        }
    }
}