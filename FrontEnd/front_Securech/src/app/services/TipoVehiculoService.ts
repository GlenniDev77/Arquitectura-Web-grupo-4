import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoVehiculo } from '../models/TipoVehiculo';
import { enviroment } from '../../environments/environment';
import { Subject } from 'rxjs';

const base_url = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class TipoVehiculoService {
  private url = `${base_url}/tipovehiculo`;

  private listaCambio = new Subject<TipoVehiculo[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<TipoVehiculo[]>(this.url);
  }

  insert(d: TipoVehiculo) {
    return this.http.post(this.url, d);
  }

  setList(listaNueva: TipoVehiculo[]) {
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable()
  }

  listID(id:number){
    return this.http.get<TipoVehiculo>(`${this.url}/${id}`);
  }

  update(d:TipoVehiculo){
    return this.http.put(this.url, d,{responseType:'text'});
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`,{responseType: 'text'});
  }
}
