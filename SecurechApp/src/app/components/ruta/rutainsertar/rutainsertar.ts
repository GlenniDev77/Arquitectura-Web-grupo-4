import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Ruta } from '../../../models/Ruta';
import { Usuario } from '../../../models/Usuario';
import { tipovehiculo } from '../../../models/TipoVehiculo';
import { Rutaservice } from '../../../services/rutaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { TipoVehiculoservice } from '../../../services/tipo-vehiculoservice';

@Component({
  selector: 'app-rutainsertar',
  imports: [MatSelectModule,MatOptionModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule],
  templateUrl: './rutainsertar.html',
  styleUrl: './rutainsertar.css',
})
export class Rutainsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  
  edicion: boolean = false;
  id: number = 0;
  ruta: Ruta = new Ruta();

  listaUsuarios: Usuario[] = [];
  listaTipovehiculos: tipovehiculo[] = [];

  constructor(
    private rS: Rutaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Usuarioservice,
    private tS: TipoVehiculoservice
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

    this.tS.list().subscribe(data => {
      this.listaTipovehiculos = data;
    });

    this.form = this.formBuilder.group({
      id_ruta: [''],
      origen: ['', Validators.required],
      origen_longitud: ['', Validators.required],
      origen_latitud: ['', Validators.required],
      destino: ['', Validators.required],
      destino_longitud: ['', Validators.required],
      destino_latitud: ['', Validators.required],
      FK: ['', Validators.required],
      FK2: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ruta.id_ruta = this.form.value.id_ruta;
      this.ruta.origen = this.form.value.origen;
      this.ruta.origen_longitud = this.form.value.origen_longitud;
      this.ruta.origen_latitud = this.form.value.origen_latitud;
      this.ruta.destino = this.form.value.destino;
      this.ruta.destino_longitud = this.form.value.destino_longitud;
      this.ruta.destino_latitud = this.form.value.destino_latitud;
      this.ruta.usuario.id_usuario = this.form.value.FK;
      this.ruta.tipovehiculo.id_tipovehiculo = this.form.value.FK2;

      if (this.edicion) {
        this.rS.update(this.ruta).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.ruta).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['rutas']);
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id_ruta: new FormControl(data.id_ruta),
          origen: new FormControl(data.origen),
          origen_longitud: new FormControl(data.origen_longitud),
          origen_latitud: new FormControl(data.origen_latitud),
          destino: new FormControl(data.destino),
          destino_longitud: new FormControl(data.destino_longitud),
          destino_latitud: new FormControl(data.destino_latitud),
          FK: new FormControl(data.usuario.nombre),
          FK2: new FormControl(data.tipovehiculo.nombre_vehiculo)
        });
      });
    }
  }
}
