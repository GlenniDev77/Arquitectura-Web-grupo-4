import { tipovehiculo } from "./TipoVehiculo"
import { Usuario } from "./Usuario"

export class Ruta {
    id_ruta:number=0
    origen:string=""
    origen_longitud:number=0
    origen_latitud:number=0
    destino:string=""
    destino_longitud:number=0
    destino_latitud:number=0
    usuario:Usuario=new Usuario()
    tipovehiculo:tipovehiculo=new tipovehiculo()
}