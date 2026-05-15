import {Router} from "express";
import DFCtrl from "../controllers/dfCtrl.js";

const rotaDF = Router();
const dfCtrl = new DFCtrl();

rotaDF.get("/", dfCtrl.obterCardsConsorcio);
rotaDF.post("/", dfCtrl.processarIntents);

export default rotaDF;