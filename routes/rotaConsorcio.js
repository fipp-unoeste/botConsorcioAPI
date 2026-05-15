import {Router} from "express";
import ConsorcioCtrl from "../controllers/consorcioCtrl.js";

const rotaConsorcio = Router();
const consorcioCtrl = new ConsorcioCtrl();

rotaConsorcio.get("/", consorcioCtrl.consultar);

export default rotaConsorcio;