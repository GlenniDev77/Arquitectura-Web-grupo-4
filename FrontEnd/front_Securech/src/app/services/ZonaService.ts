import { Injectable } from "@angular/core";
import { enviroment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Zona } from "../models/Zona";

const base_url=enviroment.base

@Injectable({
    providedIn: 'root',
})
export class ZonaService{
    private url=`${base_url}/zonas`

    constructor(private http:HttpClient){}

    list(){
        return this.http.get<Zona[]>(this.url)
    }
}