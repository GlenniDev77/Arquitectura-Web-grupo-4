import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Usuarioservice } from '../../services/usuarioservice';

@Component({
  selector: 'app-reporte-usuarios-activos',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reporte-usuarios-activos.html',
  styleUrl: './reporte-usuarios-activos.css',
})
export class ReporteUsuariosActivos implements OnInit{
  //estructura del grafico -------
    hasData=false
    barChartOptions:ChartOptions={
      responsive:true
    }
    barChartType:ChartType= 'bar'
    barChartLegend=true
    barChartLabels:string[]=[]
    barChartData: ChartDataset[]=[]
  
    constructor(private uS:Usuarioservice){}
  
    //primero en ejecutarse cuando inicia el programa
    ngOnInit(): void {
      this.uS.getUsuariosActivos().subscribe(data=>{
        if (data.length>0) {
          this.hasData=true

          const item = data[0];

          // Etiquetas para las dos barras
          this.barChartLabels = ['Registrados', 'Activos'];
          
          this.barChartData = [
          {
            data: [item.registrados, item.total_activos],
            label: 'Cantidad de Usuarios',
            backgroundColor: ['#75ddfc', '#0f4f44']
          }
        ];
        }else {
          this.hasData=false;
        }
      })
    }
}
