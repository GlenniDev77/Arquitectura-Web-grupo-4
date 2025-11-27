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
  barChartType: ChartType = 'bar';

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
        this.barChartData.push({
          label: zona,
          data: serie,
          backgroundColor: this.generateColor()
        });
      });

    } else {
      this.hasData = false;
    }
  });
}


// Generador de colores dinámicos
generateColor() {
  const r = Math.floor(Math.random() * 180 + 50);
  const g = Math.floor(Math.random() * 180 + 50);
  const b = Math.floor(Math.random() * 180 + 50);
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
  }

}
