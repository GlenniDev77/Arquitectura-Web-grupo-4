import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { Observable, Subject } from 'rxjs';
import { Delito } from '../models/Delito';
import { HttpClient } from '@angular/common/http';
import { QuantityDelitosPorDistritoyZona } from '../models/QuantityDelitosPorZyD';
import { QuantityDelitosPorHorayZona } from '../models/QuantityDelitoPorHorayZona';

const base_url=enviroment.base


@Injectable({
  providedIn: 'root',
})
export class Delitoservice {
private url=`${base_url}/delitos`
  
    private listaCambio = new Subject<Delito[]>();
  
    constructor(private http: HttpClient) {}
  
    list() {
      return this.http.get<Delito[]>(this.url);
    }
  
    insert(zn: Delito) {
      return this.http.post(this.url, zn, {responseType:'text'});
    }
  
    setList(listaNueva: Delito[]) {
      this.listaCambio.next(listaNueva);
    }
    getList(){
      return this.listaCambio.asObservable()
    }
    listId(id:number){
      return this.http.get<Delito>(`${this.url}/${id}`)
    }
    update(zn:Delito){
      return this.http.put(this.url, zn, {responseType:'text'})
    }
    delete(id:number){
      return this.http.delete(`${this.url}/${id}`, {responseType:'text'})
    }   
    getDelitosPorZyD(): Observable<QuantityDelitosPorDistritoyZona[]>{
      return this.http.get<QuantityDelitosPorDistritoyZona[]>(`${this.url}/MasDelitosPorZD`)
    }
    getDelitosPorHyZ(): Observable<QuantityDelitosPorHorayZona[]>{
      return this.http.get<QuantityDelitosPorHorayZona[]>(`${this.url}/MasDelitosPorHZ`)
    }
}
