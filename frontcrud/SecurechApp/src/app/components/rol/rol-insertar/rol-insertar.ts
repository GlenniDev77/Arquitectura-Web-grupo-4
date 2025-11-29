import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../../models/Rol';
import { Usuario } from '../../../models/Usuario';
import { Rolservice } from '../../../services/rolservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rol-insertar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './rol-insertar.html',
  styleUrl: './rol-insertar.css',
})
export class RolInsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  zon: Rol = new Rol();

  //Actualizar
  edicion:boolean=false
  id:number=0


  listaUsuarios:Usuario[]=[]

  listaRoles: { value: string; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'USER', viewValue: 'USER' },
    { value: 'MODERADOR', viewValue: 'MODERADOR' },
    { value: 'AUTORIDAD', viewValue: 'AUTORIDAD' }
  ];


  constructor(
    private zS: Rolservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private uS:Usuarioservice,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id']
      this.edicion = data['id']!=null
      //Llenar datos en formulario
      this.init()

    })

    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      rol: ['', Validators.required],
      FK: ['', Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {

    this.zon.id_rol = this.form.value.codigo;
    this.zon.nombre_rol = this.form.value.rol;
    this.zon.user.id_usuario = this.form.value.FK;

    if (this.edicion) {
      // --- MODO EDICIÓN ---
      this.zS.update(this.zon).subscribe({
        next: () => {
          this.zS.list().subscribe(data => {
            this.zS.setList(data);

            this.snackBar.open('Rol actualizado correctamente.', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
          });

          this.router.navigate(['roles']);
        },
        error: () => {
          this.snackBar.open('No se pudo actualizar el rol.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });

    } else {
      // --- MODO REGISTRO ---
      this.zS.insert(this.zon).subscribe({
        next: () => {
          this.zS.list().subscribe(data => {
            this.zS.setList(data);

            this.snackBar.open('Rol registrado exitosamente.', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
          });

          this.router.navigate(['roles']);
        },
        error: () => {
          this.snackBar.open('No se pudo registrar el rol.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
  }
  init(){
    if(this.edicion){
      this.zS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          codigo:new FormControl(data.id_rol),
          rol:new FormControl(data.nombre_rol),
          FK:new FormControl(data.user.id_usuario)
        })
        this.form.get('FK')?.disable()
      })
    }
  }
}
