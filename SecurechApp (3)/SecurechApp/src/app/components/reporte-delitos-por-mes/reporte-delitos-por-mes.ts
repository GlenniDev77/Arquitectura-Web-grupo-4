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
    barChartType: ChartType = 'pie';
  
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
      const bgColors = ['#2fb9a3', '#f6d101', '#5b20bb', '#f90601', '#0dec18'];
      return Array.from({ length }, (_, i) => bgColors[i % bgColors.length]);
    }
  
    generateBorderList(length: number) {
      const solidColors = ['#2fb9a3', '#4dd3be', '#6fa8dc', '#9ad0ec', '#dfe6e9'];
      return Array.from({ length }, (_, i) => solidColors[i % solidColors.length]);
    }
}
