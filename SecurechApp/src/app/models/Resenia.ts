import { Usuario } from "./Usuario";
import { Ruta } from "./Ruta";

export class Resenia{
    id_resenia:number=0
    comentario:string=""
    calificacion:number=0
    fecha:string=""
    usuario: Usuario=new Usuario()
    ruta: Ruta=new Ruta()
}