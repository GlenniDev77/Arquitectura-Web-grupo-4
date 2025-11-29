import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Resenia } from '../../../models/Resenia';
import { Usuario } from '../../../models/Usuario';
import { Ruta } from '../../../models/Ruta';
import { Reseniaservice } from '../../../services/reseniaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Rutaservice } from '../../../services/rutaservice';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reseniainsertar',
  imports: [ 
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './reseniainsertar.html',
  styleUrl: './reseniainsertar.css',
})
export class Reseniainsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  
  edicion: boolean = false;
  id: number = 0;
  resenia: Resenia = new Resenia();

  mostrarMensaje(mensaje: string) {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['mensaje-exito']
  });
  }

  listaUsuarios: Usuario[] = [];
  listaRutas: Ruta[] = [];

  // Variables para mostrar nombres seleccionados
  usuarioSeleccionado: Usuario = new Usuario();
  rutaSeleccionada: Ruta = new Ruta();

  constructor(
    private rS: Reseniaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Usuarioservice,
    private rtS: Rutaservice,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Inicializar objetos anidados
    this.resenia.usuario = new Usuario();
    this.resenia.ruta = new Ruta();

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });

    this.rtS.list().subscribe(data => {
      this.listaRutas = data;
    });

    // Inicializar con fecha actual
    const fechaActual = new Date().toISOString().split('T')[0];

    this.form = this.formBuilder.group({
      id_resenia: [''],
      comentario: ['', Validators.required],
      calificacion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      fecha: [fechaActual, Validators.required],
      FK: ['', Validators.required],
      FK2: ['', Validators.required]
    });

    // Suscribirse a cambios en los selects
    this.form.get('FK')?.valueChanges.subscribe(id => {
      const usuario = this.listaUsuarios.find(u => u.id_usuario === id);
      this.usuarioSeleccionado = usuario || new Usuario();
    });

    this.form.get('FK2')?.valueChanges.subscribe(id => {
      const ruta = this.listaRutas.find(r => r.id_ruta === id);
      this.rutaSeleccionada = ruta || new Ruta();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.resenia.id_resenia = this.form.value.id_resenia;
      this.resenia.comentario = this.form.value.comentario;
      this.resenia.calificacion = this.form.value.calificacion;
      this.resenia.fecha = this.form.value.fecha;
      
      // Asignar objetos completos, no solo IDs
      const usuarioSeleccionado = this.listaUsuarios.find(u => u.id_usuario === this.form.value.FK);
      const rutaSeleccionada = this.listaRutas.find(r => r.id_ruta === this.form.value.FK2);
      
      if (usuarioSeleccionado) {
        this.resenia.usuario = usuarioSeleccionado;
      }
      
      if (rutaSeleccionada) {
        this.resenia.ruta = rutaSeleccionada;
      }

      if (this.edicion) {
        this.rS.update(this.resenia).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.router.navigate(['resenias']);
          });
          this.mostrarMensaje("Reseña actualizada correctamente");
        });
      } else {
        this.rS.insert(this.resenia).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.router.navigate(['resenias']);
          });
          this.mostrarMensaje("Reseña registrada correctamente");
        });
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      this.marcarCamposComoTouched();
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        // Buscar el usuario y ruta correspondientes para mostrar sus nombres
        const usuarioEncontrado = this.listaUsuarios.find(u => u.id_usuario === data.usuario.id_usuario);
        const rutaEncontrada = this.listaRutas.find(r => r.id_ruta === data.ruta.id_ruta);

        this.form.patchValue({
          id_resenia: data.id_resenia,
          comentario: data.comentario,
          calificacion: data.calificacion,
          fecha: data.fecha,
          FK: data.usuario.id_usuario,  // Guardar el ID
          FK2: data.ruta.id_ruta        // Guardar el ID
        });

        // Actualizar los objetos seleccionados para mostrar nombres
        this.usuarioSeleccionado = usuarioEncontrado || new Usuario();
        this.rutaSeleccionada = rutaEncontrada || new Ruta();
      });
    }
  }

  seleccionarCalificacion(calificacion: number): void {
    this.form.patchValue({
      calificacion: calificacion
    });
  }

  // Método para mostrar información del usuario seleccionado
  getUsuarioDisplay(): string {
    return this.usuarioSeleccionado.nombre || 'Seleccione un usuario';
  }

  // Método para mostrar información de la ruta seleccionada
  getRutaDisplay(): string {
    if (this.rutaSeleccionada.origen && this.rutaSeleccionada.destino) {
      return `${this.rutaSeleccionada.origen} - ${this.rutaSeleccionada.destino}`;
    }
    return 'Seleccione una ruta';
  }

  // Método para marcar todos los campos como touched
  private marcarCamposComoTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Método para verificar si un campo es válido
  esCampoInvalido(campo: string): boolean {
    const formControl = this.form.get(campo);
    return formControl ? formControl.invalid && formControl.touched : false;
  }

  // Método para obtener mensaje de error
  obtenerMensajeError(campo: string): string {
    const formControl = this.form.get(campo);
    if (formControl?.errors) {
      if (formControl.errors['required']) {
        return 'Este campo es requerido';
      }
      if (formControl.errors['min']) {
        return `El valor mínimo es ${formControl.errors['min'].min}`;
      }
      if (formControl.errors['max']) {
        return `El valor máximo es ${formControl.errors['max'].max}`;
      }
    }
    return '';
  }
}