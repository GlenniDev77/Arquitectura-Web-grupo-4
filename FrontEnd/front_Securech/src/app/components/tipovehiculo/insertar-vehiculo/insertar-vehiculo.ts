import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TipoVehiculo } from '../../../models/TipoVehiculo';
import { TipoVehiculoService } from '../../../services/TipoVehiculoService';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-insertar-vehiculo',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './insertar-vehiculo.html',
  styleUrl: './insertar-vehiculo.css',
})
export class InsertarVehiculo implements OnInit {
  form: FormGroup = new FormGroup({});
  dev: TipoVehiculo = new TipoVehiculo();

  edicion: boolean = false;
  id: number = 0;

  typeDevices: { value: string; viewValue: string }[] = [
    { value: 'Taxi', viewValue: 'Taxi' },
    { value: 'Transporte Publico', viewValue: 'Transporte Publico' },
    { value: 'Auto', viewValue: 'Auto' },
  ];

  constructor(
    private dS: TipoVehiculoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //llenar datos en formulario
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required]
    });
  }

  aceptar(): void {
    if(this.form.valid){
      this.dev.id_tipovehiculo=this.form.value.codigo
      this.dev.nombre_vehiculo=this.form.value.nombre
      if(this.edicion){
        //editar
        this.dS.update(this.dev).subscribe(data=>{
        this.dS.list().subscribe(data=>{
          this.dS.setList(data)
        })
      })
      }else{
        this.dS.insert(this.dev).subscribe(data=>{
        this.dS.list().subscribe(data=>{
          this.dS.setList(data)
        })
      })
      }
      this.router.navigate(['tipovehiculo'])
    }
  }

  init(){
    if(this.edicion){
      this.dS.listID(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.id_tipovehiculo),
          nombre:new FormControl(data.nombre_vehiculo)
        });
      });
    }
  }

}
