import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { tipovehiculo } from '../../../models/TipoVehiculo';
import { TipoVehiculoservice } from '../../../services/tipo-vehiculoservice';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { TipoVehiculo } from '../tipo-vehiculo';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-vehiculo-registrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './tipo-vehiculo-registrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './tipo-vehiculo-registrar.css',
})
export class TipoVehiculoRegistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  tpv: tipovehiculo = new tipovehiculo();

  //Actualizar
  edicion:boolean=false
  id:number=0

  mostrarMensaje(mensaje: string) {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['mensaje-exito']
  });
  }


  constructor(
    private tvS: TipoVehiculoservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {

    this.route.params.subscribe((data:Params)=>{
      this.id = data['id']
      this.edicion = data['id']!=null
      //Llenar datos en formulario
      this.init()

    })

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required]
    });

  
  }
  aceptar(): void {
    if(this.form.valid){
      this.tpv.id_tipovehiculo = this.form.value.codigo
      this.tpv.nombre_vehiculo=this.form.value.nombre
      
      if(this.edicion){
        //editar
        this.tvS.update(this.tpv).subscribe(data=>{
        this.tvS.list().subscribe(data=>{
          this.tvS.setList(data)
        })
        this.mostrarMensaje('Vehículo actualizado correctamente');
      })
      } else {
        this.tvS.insert(this.tpv).subscribe(data=>{
        this.tvS.list().subscribe(data=>{
          this.tvS.setList(data)
        })
        this.mostrarMensaje('Vehículo registrado correctamente');
      })
      }
      this.router.navigate(['tipovehiculos'])
    }
  }
  init(){
    if(this.edicion){
      this.tvS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo:new FormControl(data.id_tipovehiculo),
          nombre:new FormControl(data.nombre_vehiculo),
        })
      })
    }
  }
}
