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
