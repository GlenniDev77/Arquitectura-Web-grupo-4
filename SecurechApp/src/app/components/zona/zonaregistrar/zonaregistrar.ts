import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Zona } from '../../../models/Zona';
import { Zonaservice } from '../../../services/zonaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-zonaregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './zonaregistrar.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './zonaregistrar.css',
})
export class Zonaregistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  zon: Zona = new Zona();

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


  distritosZonas: { value: string; viewValue: string }[] = [
    { value: 'Santiago de Surco', viewValue: 'Santiago de Surco' },
    { value: 'La Molina', viewValue: 'La Molina' },
  ];

  estadosZona: { value: string; viewValue: string }[] = [
    { value: 'Muy seguro', viewValue: 'Muy seguro' },
    { value: 'Seguro', viewValue: 'Seguro' },
    { value: 'Normal', viewValue: 'Normal' }
  ];

  constructor(
    private zS: Zonaservice,
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
      nombre: ['', Validators.required],
      distrito: ['', Validators.required],
      estadoZona: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required]
    });
  }
  aceptar(): void {
    if(this.form.valid){
      this.zon.idZona = this.form.value.codigo
      this.zon.nombre=this.form.value.nombre
      this.zon.distrito=this.form.value.distrito
      this.zon.estadoZona=this.form.value.estadoZona
      this.zon.latitud=this.form.value.latitud
      this.zon.longitud=this.form.value.longitud
      if(this.edicion){
        //editar
        this.zS.update(this.zon).subscribe(data=>{
        this.zS.list().subscribe(data=>{
          this.zS.setList(data)
        })
        this.mostrarMensaje('Zona actualizada correctamente');
      })
      } else {
        this.zS.insert(this.zon).subscribe(data=>{
        this.zS.list().subscribe(data=>{
          this.zS.setList(data)
        })
        this.mostrarMensaje('Zona registrada correctamente');
      })
      }
      this.router.navigate(['zonas'])
    }
  }
  init(){
    if(this.edicion){
      this.zS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo:new FormControl(data.idZona),
          nombre:new FormControl(data.nombre),
          distrito:new FormControl(data.distrito),
          estadoZona:new FormControl(data.estadoZona),
          latitud:new FormControl(data.latitud),
          longitud:new FormControl(data.longitud)
        })
      })
    }
  }
}
