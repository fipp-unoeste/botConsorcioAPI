import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

const porta = 5000;
const host = '0.0.0.0';
const app = express();
app.use(express.json());


app.listen(porta, host, () =>{
    console.log(`Servidor rodando em http://${host}:${porta}`);
})