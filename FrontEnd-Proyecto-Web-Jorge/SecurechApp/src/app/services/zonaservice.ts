import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Zona } from '../components/zona/zona';

const base_url=enviroment.base


@Injectable({
  providedIn: 'root',
})
export class Zonaservice {
  private url=`${base_url}/zonas`

  constructor(private http:HttpClient){}

  list(){
    return this.http.get<Zona[]>(this.url)
  }
}
