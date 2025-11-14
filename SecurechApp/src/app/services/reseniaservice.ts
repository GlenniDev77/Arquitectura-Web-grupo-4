import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Subject } from 'rxjs';
import { Resenia } from '../models/Resenia';
import { HttpClient } from '@angular/common/http';


const base_url = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class Reseniaservice {
  private url = `${base_url}/resenias`;
  private listaCambio = new Subject<Resenia[]>();
  
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Resenia[]>(this.url);
  }

  insert(res: Resenia) {
    return this.http.post(this.url, res);
  }

  setList(listaNueva: Resenia[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Resenia>(`${this.url}/${id}`);
  }

  update(res: Resenia) {
    return this.http.put(this.url, res);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
