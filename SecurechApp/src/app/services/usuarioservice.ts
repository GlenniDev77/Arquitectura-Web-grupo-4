import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { UsuariosConMasReportesDTO } from '../models/UsuariosConMasReportesDTO';
import { QuantityUsuariosActivosDTO } from '../models/QuantityUsuariosActivosDTO';

const base_url=enviroment.base


@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
private url=`${base_url}/usuarios`
  
    private listaCambio = new Subject<Usuario[]>();
  
    constructor(private http: HttpClient) {}
  
    list() {
      return this.http.get<Usuario[]>(this.url);
    }
  
    insert(zn: Usuario) {
      return this.http.post(this.url, zn, {responseType:'text'});
    }
  
    setList(listaNueva: Usuario[]) {
      this.listaCambio.next(listaNueva);
    }
    getList(){
      return this.listaCambio.asObservable()
    }
    listId(id:number){
      return this.http.get<Usuario>(`${this.url}/${id}`)
    }
    update(zn:Usuario){
      return this.http.put(this.url, zn, {responseType:'text'})
    }
    delete(id:number){
      return this.http.delete(`${this.url}/${id}`, {responseType:'text'})
    }

    //reportes
    getUsuariosConMasReport():Observable<UsuariosConMasReportesDTO[]>{
      return this.http.get<UsuariosConMasReportesDTO[]>(`${this.url}/UsuariosConMasReportes`)
    }
    getUsuariosActivos():Observable<QuantityUsuariosActivosDTO[]>{
      return this.http.get<QuantityUsuariosActivosDTO[]>(`${this.url}/URvsActivos`)
    }
}
