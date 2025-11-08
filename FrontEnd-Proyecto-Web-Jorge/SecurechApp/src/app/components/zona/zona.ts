import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Zonalistar } from './zonalistar/zonalistar';


@Component({
  selector: 'app-zona',
  imports: [RouterOutlet,Zonalistar],
  templateUrl: './zona.html',
  styleUrl: './zona.css',
})
export class Zona {
  constructor(public route:ActivatedRoute){}
}
