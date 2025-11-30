import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Rutaservice } from '../../services/rutaservice';

@Component({
  selector: 'app-reporte-rutas-por-tvehiculo',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './reporte-rutas-por-tvehiculo.html',
  styleUrl: './reporte-rutas-por-tvehiculo.css',
})
export class ReporteRutasPorTvehiculo {
  hasData = false;
  
    barChartOptions: ChartOptions = { responsive: true };
    barChartLegend = true;
    barChartLabels: string[] = [];
    barChartData: ChartDataset[] = [];
    barChartType: ChartType = 'pie';
  
    constructor(private sS:Rutaservice) {}
  
    ngOnInit(): void {
      this.sS.getRutaXVehiculo().subscribe((data) => {
  
        if (data.length > 0) {
          this.hasData = true;
  
          this.barChartLabels = data.map(item => item.tipoVehi);
  
          const quantities = data.map(item => item.cantidad_rutas);
  
          const bgColors = this.generateBackgroundList(quantities.length);
          const borderColors = this.generateBorderList(quantities.length);
  
          this.barChartData = [
            {
              data: quantities,
              label: 'Rutas por Tipo de Vehiculo',
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
