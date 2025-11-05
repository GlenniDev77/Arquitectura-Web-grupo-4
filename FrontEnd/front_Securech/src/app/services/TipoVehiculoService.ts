import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoVehiculo } from "../models/TipoVehiculo";
import { enviroment } from "../../environments/environment";

const base_url=enviroment.base

@Injectable({
    providedIn:'root',
})
export class TipoVehiculoService{
    private url=`${base_url}/tiposvehiculos`

    constructor(private http:HttpClient){}

    list(){
        return this.http.get<TipoVehiculo[]>(this.url)
    }
}