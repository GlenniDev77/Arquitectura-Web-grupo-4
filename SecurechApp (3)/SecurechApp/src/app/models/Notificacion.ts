import { Usuario } from "./Usuario"
import {Zona} from "./Zona"

export class Notificacion {
    id_notificacion:number=0
    mensaje:string=""
    usuario:Usuario=new Usuario()
    zona:Zona=new Zona()
}