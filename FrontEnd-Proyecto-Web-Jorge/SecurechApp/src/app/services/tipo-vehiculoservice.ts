import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { TipoVehiculo } from '../components/tipo-vehiculo/tipo-vehiculo';

const base_url=enviroment.base

@Injectable({
  providedIn: 'root',
})
export class TipoVehiculoservice {
  private url=`${base_url}/tipovehiculo`

  constructor(private http:HttpClient){}

  list(){
    return this.http.get<TipoVehiculo[]>(this.url)
  }
}
