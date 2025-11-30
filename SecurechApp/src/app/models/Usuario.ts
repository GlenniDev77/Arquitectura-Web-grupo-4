import { Rol } from "./Rol"

export class Usuario {
    id_usuario:number=0
    nombre:string=""
    correo:string=""
    contraseña:string=""
    telefono:number=0
    fecha:Date=new Date()
    enabled:boolean=true
    roles: Rol[] = []
}

