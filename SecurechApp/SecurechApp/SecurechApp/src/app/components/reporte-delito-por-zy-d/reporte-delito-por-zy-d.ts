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

      // 2. Crear dataset con cantidades
      this.barChartData = [
        {
          data: data.map(item => item.quantity),
          label: 'Delitos por Zona y Distrito',
          backgroundColor: data.map(() => this.generateColor())
        }
      ];

    } else {
      this.hasData = false;
    }
  });
}

// Generador de colores automáticos
generateColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
}

}
