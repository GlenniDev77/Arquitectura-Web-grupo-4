import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.css'],
  imports: [FormsModule,CommonModule],
})
export class Mapa implements AfterViewInit, OnDestroy {

  /** Si se abre más de una instancia, permite dar un id único al div del mapa */
  @Input() mapId: string = 'mapa';

  /** Emite los datos seleccionados (origen/destino + coords) */
  @Output() datosSeleccionados = new EventEmitter<any>();

  /** Emite true cuando se ha trazado una ruta (ésto activa el guardar) */
  @Output() rutaTrazada = new EventEmitter<boolean>();

  private map!: L.Map;
  private apiKey = '8ab38308413040cdb798d4ea39d2cd7d';

  origenTexto = '';
  destinoTexto = '';

  origenCoords: [number, number] | null = null;
  destinoCoords: [number, number] | null = null;

  sugerenciasOrigen: any[] = [];
  sugerenciasDestino: any[] = [];

  private rutaLayer: L.GeoJSON | null = null;

  constructor(@Optional() private dialogRef?: MatDialogRef<Mapa>) {}

  ngAfterViewInit(): void {
    this.iniciarMapa();
  }

  ngOnDestroy(): void {
    try {
      if (this.map) {
        this.map.remove();
      }
    } catch (e) {
      // ignore
    }
  }

  private iniciarMapa(): void {
    // Si ya existe un mapa en ese id, eliminarlo primero
    if ((L as any).map && this.map) {
      try { this.map.remove(); } catch (e) {}
    }

    this.map = L.map(this.mapId).setView([-12.0464, -77.0428], 13);

    L.tileLayer(
      `https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=${this.apiKey}`,
      { maxZoom: 20, attribution: '© OpenStreetMap © Geoapify' }
    ).addTo(this.map);
  }

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
      }).catch(err => {
        console.error('Error autocompletar:', err);
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
      this.marcarPunto(lat, lon, 'Origen');
    } else {
      this.destinoTexto = nombre;
      this.destinoCoords = [lat, lon];
      this.sugerenciasDestino = [];
      this.marcarPunto(lat, lon, 'Destino');
    }

    this.emitirDatos(false);
  }

  private marcarPunto(lat: number, lon: number, etiqueta: string) {
    const marker = L.marker([lat, lon]).addTo(this.map).bindPopup(etiqueta);
    setTimeout(() => marker.openPopup(), 200);
  }

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

        if (this.rutaLayer) this.map.removeLayer(this.rutaLayer);

        this.rutaLayer = L.geoJSON(feature, {
          style: { color: '#007bff', weight: 5 }
        }).addTo(this.map);

        this.map.fitBounds(this.rutaLayer.getBounds());

        // Emitir que ya existe una ruta trazada
        this.emitirDatos(true);

        // Si estamos dentro de un dialog, cerrarlo devolviendo los datos
        if (this.dialogRef) {
          this.dialogRef.close({
            origenNombre: this.origenTexto,
            destinoNombre: this.destinoTexto,
            origenLat: this.origenCoords ? this.origenCoords[0] : null,
            origenLon: this.origenCoords ? this.origenCoords[1] : null,
            destinoLat: this.destinoCoords ? this.destinoCoords[0] : null,
            destinoLon: this.destinoCoords ? this.destinoCoords[1] : null,
          });
        }

      }).catch(err => {
        console.error('Error routing:', err);
        alert('Error al calcular la ruta.');
      });
  }

  emitirDatos(rutaTrazadaFlag: boolean = false) {
    const payload = {
      origenNombre: this.origenTexto,
      destinoNombre: this.destinoTexto,
      origenLat: this.origenCoords ? this.origenCoords[0] : null,
      origenLon: this.origenCoords ? this.origenCoords[1] : null,
      destinoLat: this.destinoCoords ? this.destinoCoords[0] : null,
      destinoLon: this.destinoCoords ? this.destinoCoords[1] : null,
    };

    this.datosSeleccionados.emit(payload);

    if (rutaTrazadaFlag) {
      this.rutaTrazada.emit(true);
    }
  }

}
