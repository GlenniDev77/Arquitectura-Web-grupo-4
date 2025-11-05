import { Component, signal } from '@angular/core';
import { Tipovehiculo } from './components/tipovehiculo/tipovehiculo';

@Component({
  selector: 'app-root',
  imports: [Tipovehiculo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front_Securech');
}
