import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Delitoservice } from '../../services/delitoservice';

@Component({
  selector: 'app-reporte-delito-por-hy-z',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reporte-delito-por-hy-z.html',
  styleUrl: './reporte-delito-por-hy-z.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ReporteDelitoPorHyZ implements OnInit{
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLegend = true;
  barChartLabels: string[] = [];

  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'line';

  constructor(private sS: Delitoservice) {}

ngOnInit(): void {
  this.sS.getDelitosPorHyZ().subscribe((data) => {
    if (data.length > 0) {

      this.hasData = true;

      // 1. Horas únicas ordenadas (eje X)
      const horasUnicas = [...new Set(data.map(item => item.hora))]
        .sort((a, b) => Number(a) - Number(b));

      this.barChartLabels = horasUnicas;

      // 2. Agrupamos por zona
      const zonasMap = new Map<string, any>();

      data.forEach(item => {
        if (!zonasMap.has(item.zona)) {
          zonasMap.set(item.zona, {});
        }
        zonasMap.get(item.zona)[item.hora] = item.quantity;
      });

      // 3. Crear datasets para cada zona
      this.barChartData = [];

      zonasMap.forEach((horasMap, zona) => {
        const serie = horasUnicas.map(h => horasMap[h] || 0);
        const bgColors = this.generateBackgroundList(serie.length);
        const borderColors = this.generateBorderList(serie.length);
        this.barChartData.push({
          label: zona,
          data: serie,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 2
        });
      });

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



