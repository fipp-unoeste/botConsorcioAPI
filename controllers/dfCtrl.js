import obterCardsConsorcios from "../Dialogflow/funcoes.js";

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
}