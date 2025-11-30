import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Notificacionservice } from '../../services/notificacionservice';

@Component({
  selector: 'app-reporte-mas-notis-por-zona',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './reporte-mas-notis-por-zona.html',
  styleUrl: './reporte-mas-notis-por-zona.css',
})
export class ReporteMasNotisPorZona implements OnInit{

  hasData = false;

  barChartOptions: ChartOptions = { responsive: true };
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(private sS: Notificacionservice) {}

  ngOnInit(): void {
    this.sS.getMasNotisXZona().subscribe((data) => {

      if (data.length > 0) {
        this.hasData = true;

        // Etiquetas: nombres de los usuarios
        this.barChartLabels = data.map(item => item.nombre_zona);

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
    const bgColors = ['#2fb9a3', '#f6d101', '#5b20bb', '#f90601', '#0dec18'];
    return Array.from({ length }, (_, i) => bgColors[i % bgColors.length]);
  }

  generateBorderList(length: number) {
    const solidColors = ['#2fb9a3', '#4dd3be', '#6fa8dc', '#9ad0ec', '#dfe6e9'];
    return Array.from({ length }, (_, i) => solidColors[i % solidColors.length]);
  }
}
