import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-insertar',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule],
  templateUrl: './usuario-insertar.html',
  styleUrl: './usuario-insertar.css',
})
export class UsuarioInsertar implements OnInit{
  form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  sof: Usuario = new Usuario();

  soloNumeros(event: any) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }

  constructor(
    private sS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

  
    const ahora = new Date();
    
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      correoUsuario: ['', Validators.required],
      correoDominio: ['', Validators.required],
      contra: ['', Validators.required],
      telef: ['', Validators.required],
      fecha: [ahora, Validators.required],
      estado: ['', Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.sof.id_usuario = this.form.value.codigo;
      this.sof.nombre = this.form.value.nombre;
      this.sof.correo = this.form.value.correoUsuario + this.form.value.correoDominio;
      this.sof.contraseña = this.form.value.contra;
      this.sof.telefono = this.form.value.telef;
      this.sof.fecha = this.form.value.fecha;
      this.sof.enabled = this.form.value.estado;
      

    if (this.edicion) {
      this.sS.update(this.sof).subscribe({
        
      
        next: () => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);

            this.snackBar.open('Usuario actualizado correctamente.', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
          });

          this.router.navigate(['usuarios']);
        },

        
        error: (err) => {
          console.error('Error en la actualización:', err);

          this.snackBar.open('No se pudo actualizar el usuario.', 'Cerrar', {
            duration: 3500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
      return;
    }

    
    this.sS.insert(this.sof).subscribe({
      next: () => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);

          this.snackBar.open('Usuario registrado correctamente.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        });

        this.router.navigate(['usuarios']);
      },

      error: (err) => {
        console.error('Error al registrar:', err);

        this.snackBar.open('No se pudo registrar el usuario.', 'Cerrar', {
          duration: 3500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {

        const [usuario, dominio] = data.correo.split('@');
        const dominioCompleto = '@' + dominio;

        this.form = new FormGroup({
          codigo: new FormControl(data.id_usuario),
          nombre: new FormControl(data.nombre),
          correoUsuario: new FormControl(usuario),
          correoDominio: new FormControl(dominioCompleto),
          contra: new FormControl(data.contraseña),
          telef: new FormControl(data.telefono),
          fecha: new FormControl(data.fecha),
          estado: new FormControl(data.enabled)
        });
      });
    }
  }
}
