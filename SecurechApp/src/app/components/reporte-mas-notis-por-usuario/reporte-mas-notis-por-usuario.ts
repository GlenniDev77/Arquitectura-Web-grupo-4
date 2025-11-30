import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Notificacionservice } from '../../services/notificacionservice';

@Component({
  selector: 'app-reporte-mas-notis-por-usuario',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './reporte-mas-notis-por-usuario.html',
  styleUrl: './reporte-mas-notis-por-usuario.css',
})
export class ReporteMasNotisPorUsuario implements OnInit{

  hasData = false;

  barChartOptions: ChartOptions = { responsive: true };
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(private sS: Notificacionservice) {}

  ngOnInit(): void {
    this.sS.getMasNotisXUsuario().subscribe((data) => {

      if (data.length > 0) {
        this.hasData = true;

        // Etiquetas: nombres de los usuarios
        this.barChartLabels = data.map(item => item.nombre_usuario);

        // Cantidades: número de notificaciones
        const quantities = data.map(item => item.totalNotificaciones);

        // Colores dinámicos
        const bgColors = this.generateBackgroundList(quantities.length);
        const borderColors = this.generateBorderList(quantities.length);

        // Dataset final
        this.barChartData = [
          {
            data: quantities,
            label: 'Notificaciones por Usuario',
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 2
          }
        ];

      } else {
        this.hasData = false;
      }

    });
  }

  generateBackgroundList(length: number) {
  const bgColors = [
    '#2fb9a3', // Verde principal
    '#1a8a76', // Verde oscuro
    '#156c5d', // Verde más oscuro
    '#0f4f44', // Verde muy oscuro
    '#08332b'  // Verde casi negro
  ];

  return Array.from({ length }, (_, i) => bgColors[i % bgColors.length]);
}

generateBorderList(length: number) {
  const borderColors = [
    '#2fb9a3', // Verde principal
    '#3ac9b0', // Verde claro
    '#4dd3be', // Verde más claro
    '#67dcc9', // Verde muy claro
    '#8ae4d6'  // Verde pastel
  ];

  return Array.from({ length }, (_, i) => borderColors[i % borderColors.length]);
}
}
