import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Delitoservice } from '../../services/delitoservice';

@Component({
  selector: 'app-reporte-delito-por-zy-d',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reporte-delito-por-zy-d.html',
  styleUrl: './reporte-delito-por-zy-d.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReporteDelitoPorZyD implements OnInit{
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(private sS: Delitoservice) {}

  ngOnInit(): void {
  this.sS.getDelitosPorZyD().subscribe((data) => {
    if (data.length > 0) {

      this.hasData = true;

      // 1. Crear etiquetas combinando zona + distrito
      this.barChartLabels = data.map(item => `${item.zona} - ${item.distrito}`);
      const quantities = data.map(item => item.quantity);

      const bgColors = this.generateBackgroundList(quantities.length);
      const borderColors = this.generateBorderList(quantities.length);
      // 2. Crear dataset con cantidades
      this.barChartData = [
        {
          data: quantities,
          label: 'Delitos por Zona y Distrito',
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
    '#2fb9a3',
    '#f6d101ff',
    '#5b20bbff',
    '#f90601ff',
    '#0dec18ff'
  ];

  return Array.from({ length }, (_, i) => bgColors[i % bgColors.length]);
}

generateBorderList(length: number) {
  const solidColors = [
    '#2fb9a3',
    '#4dd3be',
    '#6fa8dc',
    '#9ad0ec',
    '#dfe6e9'
  ];

  return Array.from({ length }, (_, i) => solidColors[i % solidColors.length]);
}


}
