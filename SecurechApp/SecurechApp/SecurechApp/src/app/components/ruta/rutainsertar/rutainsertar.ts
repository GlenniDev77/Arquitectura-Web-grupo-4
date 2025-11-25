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

  // Variables para mostrar nombres en lugar de IDs
  usuarioSeleccionado: Usuario = new Usuario();
  tipoVehiculoSeleccionado: tipovehiculo = new tipovehiculo();

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
      FK: ['', Validators.required],  // Aquí se guarda el ID del usuario
      FK2: ['', Validators.required]  // Aquí se guarda el ID del tipo de vehículo
    });

    // Suscribirse a cambios para mostrar nombres
    this.form.get('FK')?.valueChanges.subscribe(id => {
      const usuario = this.listaUsuarios.find(u => u.id_usuario === id);
      this.usuarioSeleccionado = usuario || new Usuario();
    });

    this.form.get('FK2')?.valueChanges.subscribe(id => {
      const tipoVehiculo = this.listaTipovehiculos.find(t => t.id_tipovehiculo === id);
      this.tipoVehiculoSeleccionado = tipoVehiculo || new tipovehiculo();
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
      
      // Asignar los objetos completos (no solo los IDs)
      this.ruta.usuario = this.usuarioSeleccionado;
      this.ruta.tipovehiculo = this.tipoVehiculoSeleccionado;

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
        // Buscar el usuario y tipo de vehículo correspondientes para mostrar sus nombres
        const usuarioEncontrado = this.listaUsuarios.find(u => u.id_usuario === data.usuario.id_usuario);
        const tipoVehiculoEncontrado = this.listaTipovehiculos.find(t => t.id_tipovehiculo === data.tipovehiculo.id_tipovehiculo);

        this.form.patchValue({
          id_ruta: data.id_ruta,
          origen: data.origen,
          origen_longitud: data.origen_longitud,
          origen_latitud: data.origen_latitud,
          destino: data.destino,
          destino_longitud: data.destino_longitud,
          destino_latitud: data.destino_latitud,
          FK: data.usuario.id_usuario,  // Guardar el ID
          FK2: data.tipovehiculo.id_tipovehiculo  // Guardar el ID
        });

        // Actualizar los objetos seleccionados para mostrar nombres
        this.usuarioSeleccionado = usuarioEncontrado || new Usuario();
        this.tipoVehiculoSeleccionado = tipoVehiculoEncontrado || new tipovehiculo();
      });
    }
  }

  // Método para mostrar información del usuario seleccionado
  getUsuarioDisplay(): string {
    return this.usuarioSeleccionado.nombre || 'Seleccione un usuario';
  }

  // Método para mostrar información del tipo de vehículo seleccionado
  getTipoVehiculoDisplay(): string {
    return this.tipoVehiculoSeleccionado.nombre_vehiculo || 'Seleccione un tipo de vehículo';
  }
}