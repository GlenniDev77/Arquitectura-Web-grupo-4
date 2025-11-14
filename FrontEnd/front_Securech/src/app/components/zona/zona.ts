import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Zonalistar } from "./zonalistar/zonalistar";
import { Mapa } from '../mapa/mapa';

@Component({
  selector: 'app-zona',
  imports: [RouterOutlet, Zonalistar, Mapa],
  templateUrl: './zona.html',
  styleUrl: './zona.css',
})
export class Zona {
  constructor(public route:ActivatedRoute){}
}
