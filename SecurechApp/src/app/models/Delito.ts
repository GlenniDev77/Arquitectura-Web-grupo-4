import { Usuario } from "./Usuario"
import { Zona } from "./Zona"

export class Delito {
    id_reportedelito:number=0
    tipo_delito:string=""
    descripcion:string=""
    fecha_hora:string = ""
    nombre:string=""
    usuario:Usuario=new Usuario()
    zona:Zona=new Zona()
}