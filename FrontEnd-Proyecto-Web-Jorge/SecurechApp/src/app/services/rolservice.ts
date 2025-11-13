import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Subject } from 'rxjs';
import { Rol } from '../models/Rol';
import { HttpClient } from '@angular/common/http';

const base_url=enviroment.base

@Injectable({
  providedIn: 'root',
})
export class Rolservice {
   private url=`${base_url}/roles`
  
    private listaCambio = new Subject<Rol[]>();
  
    constructor(private http: HttpClient) {}
  
    list() {
      return this.http.get<Rol[]>(this.url);
    }
  
    insert(zn: Rol) {
      return this.http.post(this.url, zn, {responseType:'text'});
    }
  
    setList(listaNueva: Rol[]) {
      this.listaCambio.next(listaNueva);
    }
    getList(){
      return this.listaCambio.asObservable()
    }
    listId(id:number){
      return this.http.get<Rol>(`${this.url}/${id}`)
    }
    update(zn:Rol){
      return this.http.put(this.url, zn, {responseType:'text'})
    }
    delete(id:number){
      return this.http.delete(`${this.url}/${id}`, {responseType:'text'})
    }
}
