import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Usuarioservice } from '../../services/usuarioservice';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte-usuario-reportes',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reporte-usuario-reportes.html',
  styleUrl: './reporte-usuario-reportes.css',
})
export class ReporteUsuarioReportes implements OnInit {
  //estructura del grafico -------
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType ='bar';
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];

  constructor(private uS: Usuarioservice) {}

  //primero en ejecutarse cuando inicia el programa
  ngOnInit(): void {
    this.uS.getUsuariosConMasReport().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.nombre);
        this.barChartData = [
          {
            data: data.map((item) => item.reportes_Realizados),
            label: 'Cantidad de reportes ',
            backgroundColor: [
              '#2fb9a3', // Verde principal
              '#1a8a76', // Verde oscuro
              '#156c5d', // Verde más oscuro
              '#0f4f44', // Verde muy oscuro
              '#08332b',
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
