import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Delitoservice } from '../../services/delitoservice';

@Component({
  selector: 'app-reporte-delitos-por-mes',
  imports: [BaseChartDirective, MatIconModule],
  templateUrl: './reporte-delitos-por-mes.html',
  styleUrl: './reporte-delitos-por-mes.css',
})
export class ReporteDelitosPorMes {
 hasData = false;
  
    barChartOptions: ChartOptions = { responsive: true };
    barChartLegend = true;
    barChartLabels: string[] = [];
    barChartData: ChartDataset[] = [];
    barChartType: ChartType = 'line';
  
    constructor(private sS:Delitoservice) {}
  
    ngOnInit(): void {
      this.sS.getDelitosPorMes().subscribe((data) => {
  
        if (data.length > 0) {
          this.hasData = true;
  
          this.barChartLabels = data.map(item => item.mes);
  
          const quantities = data.map(item => item.numero_delitos);
  
          const bgColors = this.generateBackgroundList(quantities.length);
          const borderColors = this.generateBorderList(quantities.length);
  
          this.barChartData = [
            {
              data: quantities,
              label: 'Cantidad de Delitos por Mes',
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
