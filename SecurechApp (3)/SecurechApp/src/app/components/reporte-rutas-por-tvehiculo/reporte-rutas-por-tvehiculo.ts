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
      const bgColors = ['#2fb9a3', '#f6d101', '#5b20bb', '#f90601', '#0dec18'];
      return Array.from({ length }, (_, i) => bgColors[i % bgColors.length]);
    }
  
    generateBorderList(length: number) {
      const solidColors = ['#2fb9a3', '#4dd3be', '#6fa8dc', '#9ad0ec', '#dfe6e9'];
      return Array.from({ length }, (_, i) => solidColors[i % solidColors.length]);
    }
  }
