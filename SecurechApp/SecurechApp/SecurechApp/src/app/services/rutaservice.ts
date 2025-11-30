import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Ruta } from '../models/Ruta';
import { QuantityRutasXVehiculo } from '../models/QuantityRutasXVehiculo';

const base_url = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class Rutaservice {
  private url = `${base_url}/rutas`;

  private listaCambio = new Subject<Ruta[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Ruta[]>(this.url);
  }

  insert(ru: Ruta) {
    return this.http.post(this.url, ru, { responseType: 'text' });
  }

  setList(listaNueva: Ruta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Ruta>(`${this.url}/${id}`);
  }
  update(ru: Ruta) {
    return this.http.put(this.url, ru, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  getRutaXVehiculo(): Observable<QuantityRutasXVehiculo[]> {
    return this.http.get<QuantityRutasXVehiculo[]>(`${this.url}/CantRutasPorVehiculo`);
  }
}
