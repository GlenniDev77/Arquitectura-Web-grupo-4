import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Observable, Subject } from 'rxjs';
import { Notificacion } from '../models/Notificacion';
import { HttpClient } from '@angular/common/http';
import { MasNotisXUsuarioDTO } from '../models/MasNotisXUsuarioDTO';
import { MasNotisXZonaDTO } from '../models/MasNotisxZonaDTO';

const base_url = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class Notificacionservice {
  private url = `${base_url}/notificaciones`;

  private listaCambio = new Subject<Notificacion[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Notificacion[]>(this.url);
  }

  insert(no: Notificacion) {
    return this.http.post(this.url, no, { responseType: 'text' });
  }

  setList(listaNueva: Notificacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Notificacion>(`${this.url}/${id}`);
  }
  update(no: Notificacion) {
    return this.http.put(this.url, no, { responseType: 'text' });
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getMasNotisXUsuario(): Observable<MasNotisXUsuarioDTO[]> {
    return this.http.get<MasNotisXUsuarioDTO[]>(`${this.url}/usuarios-mas-notis`);
  }

  getMasNotisXZona(): Observable<MasNotisXZonaDTO[]> {
    return this.http.get<MasNotisXZonaDTO[]>(`${this.url}/zonas-mas-notis`);
  }
}
