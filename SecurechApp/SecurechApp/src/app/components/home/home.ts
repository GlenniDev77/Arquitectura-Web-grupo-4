import { Component, OnInit } from '@angular/core';
import { Weather } from '../../services/weather';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  
  weather: any;

  // Coordenadas de Lima
  lat = -12.04318;
  lon =  -77.02824;

  constructor(private weatherService: Weather) {}

  ngOnInit(): void {
    this.cargarClima();
  }

  cargarClima() {
    this.weatherService.getCurrentWeather(this.lat, this.lon)
      .subscribe({
        next: (data) => this.weather = data.current_weather,
        error: (err) => console.log('Error de clima:', err)
      });
  }

}
