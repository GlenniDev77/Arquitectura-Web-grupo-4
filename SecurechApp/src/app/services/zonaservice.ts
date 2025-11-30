import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Zona } from '../models/Zona';

const base_url=enviroment.base


@Injectable({
  providedIn: 'root',
})
export class Zonaservice {
   private url=`${base_url}/zonas`
  
    private listaCambio = new Subject<Zona[]>();
  
    constructor(private http: HttpClient) {}
  
    list() {
      return this.http.get<Zona[]>(this.url);
    }
  
    insert(zn: Zona) {
      return this.http.post(this.url, zn, {responseType:'text'});
    }
  
    setList(listaNueva: Zona[]) {
      this.listaCambio.next(listaNueva);
    }
    getList(){
      return this.listaCambio.asObservable()
    }
    listId(id:number){
      return this.http.get<Zona>(`${this.url}/${id}`)
    }
    update(zn:Zona){
      return this.http.put(this.url, zn, {responseType:'text'})
    }
    delete(id:number){
      return this.http.delete(`${this.url}/${id}`, {responseType:'text'})
    }
}
