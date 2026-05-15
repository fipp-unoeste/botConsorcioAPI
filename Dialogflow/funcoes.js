import Consorcio from "../models/consorcio.js";

export function criarMessengerCard(){
    return {
        type: "info",
        title:"",
        subtitle:"",
        image: {
            src : {
                rawUrl:""
            }
        },
        actionLink:""
    }
}


export function criarCustomCard(){
    return{
        card: {
            title:"",
            subtitle:"",
            imageUri:"",
            buttons: [
                {
                    text:"botão",
                    postback:""
                }
            ]
        }
    }
}

export default async function obterCardsConsorcios(tipoCard="custom"){

    const cards = [];
    const consorcio = new Consorcio();
    const listaConsorcios = await consorcio.consultar();
    for(const consorcio of listaConsorcios){
        if(tipoCard == "custom"){
            const cardCustom = criarCustomCard();
            cardCustom.card.title = consorcio.codigo;
            cardCustom.card.subtitle = consorcio.veiculo
            cardCustom.card.imageUri = consorcio.imagem;
           cards.push(cardCustom);
        }
        else{
            const cardMessenger = criarMessengerCard();
            cardMessenger.type = "info";
            cardMessenger.title = consorcio.codigo;
            cardMessenger.subtitle = consorcio.veiculo;
            cardMessenger.image.src.rawUrl = consorcio.imagem;
            cards.push(cardMessenger);
        }
    }

    return cards;
}