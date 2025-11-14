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

@Component({
  selector: 'app-reseniainsertar',
  imports: [ MatSelectModule,
      MatInputModule,
      MatRadioModule,
      MatDatepickerModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatNativeDateModule,
      MatIconModule],
  templateUrl: './reseniainsertar.html',
  styleUrl: './reseniainsertar.css',
})
export class Reseniainsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  
  edicion: boolean = false;
  id: number = 0;
  resenia: Resenia = new Resenia();

  listaUsuarios: Usuario[] = [];
  listaRutas: Ruta[] = [];

  constructor(
    private rS: Reseniaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Usuarioservice,
    private rtS: Rutaservice
  ) {}

  ngOnInit(): void {
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
  }

  aceptar(): void {
    if (this.form.valid) {
      this.resenia.id_resenia = this.form.value.id_resenia;
      this.resenia.comentario = this.form.value.comentario;
      this.resenia.calificacion = this.form.value.calificacion;
      this.resenia.fecha = this.form.value.fecha;
      this.resenia.usuario.id_usuario = this.form.value.FK;
      this.resenia.ruta.id_ruta = this.form.value.FK2;

      if (this.edicion) {
        this.rS.update(this.resenia).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.resenia).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['resenias']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id_resenia: new FormControl(data.id_resenia),
          comentario: new FormControl(data.comentario),
          calificacion: new FormControl(data.calificacion),
          fecha: new FormControl(data.fecha),
          FK: new FormControl(data.usuario.id_usuario),
          FK2: new FormControl(data.ruta.id_ruta)
        });
      });
    }
  }

  seleccionarCalificacion(calificacion: number): void {
  this.form.patchValue({
    calificacion: calificacion
  });
}
}