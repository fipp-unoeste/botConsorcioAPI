import {Router} from "express";
import DFCtrl from "../controllers/dfCtrl.js";

const rotaDF = Router();
const dfCtrl = new DFCtrl();

rotaDF.get("/", dfCtrl.obterCardsConsorcio);

export default rotaDF;