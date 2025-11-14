import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.css'],
})
export class Mapa implements AfterViewInit {

  private map!: L.Map;
  private apiKey = '8ab38308413040cdb798d4ea39d2cd7d';

  // Inputs del formulario
  origenTexto = '';
  destinoTexto = '';

  // Coordenadas seleccionadas
  origenCoords: [number, number] | null = null;
  destinoCoords: [number, number] | null = null;

  // Listas de sugerencias
  sugerenciasOrigen: any[] = [];
  sugerenciasDestino: any[] = [];

  // Capa de ruta
  private rutaLayer: L.GeoJSON | null = null;

  ngAfterViewInit(): void {
    this.iniciarMapa();
  }

  // -------------------------
  // MAPA
  // -------------------------
  private iniciarMapa(): void {
    this.map = L.map('mapa').setView([-12.0464, -77.0428], 13);

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${this.apiKey}`,
      { maxZoom: 20, attribution: '© OpenStreetMap © Geoapify' }
    ).addTo(this.map);
  }

  // -------------------------
  // AUTOCOMPLETE (GEOCODING API)
  // -------------------------

  buscarSugerencias(tipo: 'origen' | 'destino', event: any) {
    const texto = event.target.value;

    if (tipo === 'origen') this.origenTexto = texto;
    else this.destinoTexto = texto;

    if (texto.length < 3) {
      if (tipo === 'origen') this.sugerenciasOrigen = [];
      else this.sugerenciasDestino = [];
      return;
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(texto)}&apiKey=${this.apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const features = Array.isArray(data.features) ? data.features : [];

        if (tipo === 'origen') this.sugerenciasOrigen = features;
        else this.sugerenciasDestino = features;
      });
  }

  seleccionarSugerencia(tipo: 'origen' | 'destino', item: any) {
    const nombre = item.properties.formatted;
    const lat = item.properties.lat;
    const lon = item.properties.lon;

    if (tipo === 'origen') {
      this.origenTexto = nombre;
      this.origenCoords = [lat, lon];
      this.sugerenciasOrigen = [];
    } else {
      this.destinoTexto = nombre;
      this.destinoCoords = [lat, lon];
      this.sugerenciasDestino = [];
    }
  }

  // -------------------------
  // RUTA (ROUTING API)
  // -------------------------

  trazarRuta() {
    if (!this.origenCoords || !this.destinoCoords) {
      alert('Debes seleccionar un origen y un destino.');
      return;
    }

    const [olat, olon] = this.origenCoords;
    const [dlat, dlon] = this.destinoCoords;

    const url = `https://api.geoapify.com/v1/routing?waypoints=${olat},${olon}|${dlat},${dlon}&mode=drive&apiKey=${this.apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const feature = data.features?.[0];
        if (!feature) {
          alert('No se encontró una ruta.');
          return;
        }

        // Eliminar ruta previa
        if (this.rutaLayer) this.map.removeLayer(this.rutaLayer);

        // Dibujar nueva ruta
        this.rutaLayer = L.geoJSON(feature, { style: { color: '#007bff', weight: 5 } })
          .addTo(this.map);

        // Ajustar vista
        this.map.fitBounds(this.rutaLayer.getBounds());
      });
  }
}
