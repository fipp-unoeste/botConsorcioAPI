import { text } from "express";
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
            cardCustom.card.buttons = [
                {
                    text: "Escolher" + consorcio.veiculo,
                    postback: "quero o " + consorcio.veiculo
                }
            ]
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

export async function apresentarMenu(origem){
    const resposta = {
        "fulfillmentMessages": []
    };

    if(origem == "custom"){

    
        try
        {
            const cards = await obterCardsConsorcios("custom");
            resposta.fulfillmentMessages.push({
                "text": {
                    "text": ["Tabela de veiculos.\n",
                        "Escolha um dos nossos consorcios e depois um plano de acordo com seu perfil"
                    ]
                }
            })
            resposta.fulfillmentMessages.push(...cards);
            resposta.fulfillmentMessages.push({
                "text": {
                    "text": ["Ja sabe qual consorcio escolher?"]
                }
            })

        }
        catch(erro){
            resposta.fulfillmentMessages.push({
                "text":{
                    "text": ["Não foi possivel acessar a tabela de consorcios disponiveis",
                        "Erro: " + erro.message,
                         "Ente em contato conosco pelo telefone (18) 99485-5712"
                    ]
                }
            });
        }
    }
    else if(origem == "messenger"){
        resposta.fulfillmentMessages.push({
            "payload": {
                "richContent": [[{
                    type:"description",
                    title: "Tabela de veiculos\n",
                    text: ["Escolha um dos nossos consorcios e depois um plano de acordo com seu perfil"],
                    
                }]]
            }
        })
        try{
            const cards = await obterCardsConsorcios("messenger");
            resposta.fulfillmentMessages[0].payload.richContent[0].push(...cards);
            resposta.fulfillmentMessages[0].payload.richContent[0].push({
                type: "description",
                text: ["Já sabe qual consorcio adquirir?"]
            })
        }
        catch(erro){
            resposta.fulfillmentMessages[0].payload.richContent[0].push({
                type: ["Não foi possivel acessar o menu",
                    "Erro: " + erro.message,
                    "Ente em contato conosco pelo telefone (18) 99485-5712"
                ]
            })
        }
    }
    return resposta;
 
 }


