import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tipovehiculo } from '../models/TipoVehiculo';

const base_url=enviroment.base

@Injectable({
  providedIn: 'root',
})
export class TipoVehiculoservice {
  private url=`${base_url}/tipovehiculo`

   private listaCambio = new Subject<tipovehiculo[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<tipovehiculo[]>(this.url);
  }

  insert(tv: tipovehiculo) {
    return this.http.post(this.url, tv, {responseType:'text'});
  }

  setList(listaNueva: tipovehiculo[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }
  listId(id:number){
    return this.http.get<tipovehiculo>(`${this.url}/${id}`)
  }
  update(tv:tipovehiculo){
    return this.http.put(this.url, tv, {responseType:'text'})
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`, {responseType:'text'})
  }
}
