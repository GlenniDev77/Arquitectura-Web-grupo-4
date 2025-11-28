import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Ruta } from '../../../models/Ruta';
import { Usuario } from '../../../models/Usuario';
import { tipovehiculo } from '../../../models/TipoVehiculo';
import { Rutaservice } from '../../../services/rutaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { TipoVehiculoservice } from '../../../services/tipo-vehiculoservice';
import { Mapa } from '../../mapa/mapa';
import { NgIf } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rutainsertar',
  templateUrl: './rutainsertar.html',
  styleUrls: ['./rutainsertar.css'],
  imports: [
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    NgIf,
    MatSnackBarModule
  ],
})
export class Rutainsertar implements OnInit {
  form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  ruta: Ruta = new Ruta();

  mostrarMensaje(mensaje: string) {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['mensaje-exito']
  });
  }

  listaUsuarios: Usuario[] = [];
  listaTipovehiculos: tipovehiculo[] = [];

  // Variables para mostrar nombres en lugar de IDs
  usuarioSeleccionado: Usuario = new Usuario();
  tipoVehiculoSeleccionado: tipovehiculo = new tipovehiculo();

  // Controla si hay una ruta trazada (habilita el botón Registrar)
  rutaTrazada: boolean = false;

  constructor(
    private rS: Rutaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Usuarioservice,
    private tS: TipoVehiculoservice,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Cargar listas primero
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.tS.list().subscribe((data) => {
      this.listaTipovehiculos = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); // ya que las listas se cargan, init parcheará si es edición
    });

    this.form = this.formBuilder.group({
      id_ruta: [''],
      origen: [{ value: '', disabled: false }, Validators.required],
      origen_longitud: [{ value: '', disabled: false }, Validators.required],
      origen_latitud: [{ value: '', disabled: false }, Validators.required],
      destino: [{ value: '', disabled: false }, Validators.required],
      destino_longitud: [{ value: '', disabled: false }, Validators.required],
      destino_latitud: [{ value: '', disabled: false }, Validators.required],
      FK: ['', Validators.required], // ID del usuario
      FK2: ['', Validators.required], // ID del tipo de vehículo
    });

    // Suscribirse a cambios para mostrar nombres
    this.form.get('FK')?.valueChanges.subscribe((id) => {
      const usuario = this.listaUsuarios.find((u) => u.id_usuario === id);
      this.usuarioSeleccionado = usuario || new Usuario();
    });

    this.form.get('FK2')?.valueChanges.subscribe((id) => {
      const tipoVehiculo = this.listaTipovehiculos.find((t) => t.id_tipovehiculo === id);
      this.tipoVehiculoSeleccionado = tipoVehiculo || new tipovehiculo();
    });
  }

  abrirMapaEnDialog(): void {
    // Pasamos un mapId único opcional para evitar colisiones si hay otros mapas
    const dialogRef = this.dialog.open(Mapa, {
      width: '92%',
      maxWidth: '900px',
      data: {
        /* si quieres pasar algo */
      },
    });

    // Si el mapa cierra con datos (en nuestro Mapa, cerramos con datos cuando trazamos ruta)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recibirDatosMapa(result);
        this.rutaTrazada = true;
      }
    });
  }

  recibirDatosMapa(event: any) {
    // Parchear el formulario (los campos están editables para mantener compatibilidad; en la template los marcamos readonly)
    this.form.patchValue({
      origen: event.origenNombre,
      origen_latitud: event.origenLat,
      origen_longitud: event.origenLon,
      destino: event.destinoNombre,
      destino_latitud: event.destinoLat,
      destino_longitud: event.destinoLon,
    });

    // marca que ya hay datos de mapa
    this.rutaTrazada = true;
  }

  aceptar(): void {
    if (this.form.valid && this.rutaTrazada) {
      // habilitar campos readonly (MATERIAL no los envía deshabilitados)
      this.form.get('origen')?.enable();
      this.form.get('origen_longitud')?.enable();
      this.form.get('origen_latitud')?.enable();
      this.form.get('destino')?.enable();
      this.form.get('destino_longitud')?.enable();
      this.form.get('destino_latitud')?.enable();      

      // Construir objeto ruta
      this.ruta.id_ruta = this.form.value.id_ruta;
      this.ruta.origen = this.form.value.origen;
      this.ruta.origen_longitud = Number(this.form.value.origen_longitud);
      this.ruta.origen_latitud = Number(this.form.value.origen_latitud);
      this.ruta.destino = this.form.value.destino;
      this.ruta.destino_longitud = Number(this.form.value.destino_longitud);
      this.ruta.destino_latitud = Number(this.form.value.destino_latitud);

      const idUsuario = this.form.value.FK;
      const idTipo = this.form.value.FK2;

      this.ruta.usuario =
        this.listaUsuarios.find((u) => u.id_usuario === idUsuario) || new Usuario();
      this.ruta.tipovehiculo =
        this.listaTipovehiculos.find((t) => t.id_tipovehiculo === idTipo) || new tipovehiculo();

      if (this.edicion) {
        this.rS.update(this.ruta).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.router.navigate(['rutas']);
          });
        });
      } else {
        this.rS.insert(this.ruta).subscribe(
          () => {
            this.rS.list().subscribe((data) => {
              this.rS.setList(data);
              this.router.navigate(['rutas']);
            });
            this.mostrarMensaje("Ruta registrada correctamente");
            
          },
          (err) => {
            console.error('Error insert ruta', err);
            alert('Error al registrar la ruta.');
          }
        );
      }
    } else {
      alert('Complete todos los datos y trace la ruta antes de registrar.');
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe(
        (data) => {
          this.form.patchValue({
            id_ruta: data.id_ruta,
            origen: data.origen,
            origen_longitud: data.origen_longitud,
            origen_latitud: data.origen_latitud,
            destino: data.destino,
            destino_longitud: data.destino_longitud,
            destino_latitud: data.destino_latitud,
            FK: data.usuario?.id_usuario || '',
            FK2: data.tipovehiculo?.id_tipovehiculo || '',
          });

          // Actualizar los objetos seleccionados para mostrar nombres
          this.usuarioSeleccionado =
            this.listaUsuarios.find((u) => u.id_usuario === data.usuario.id_usuario) ||
            new Usuario();
          this.tipoVehiculoSeleccionado =
            this.listaTipovehiculos.find(
              (t) => t.id_tipovehiculo === data.tipovehiculo.id_tipovehiculo
            ) || new tipovehiculo();

          // Si el registro ya tenía coordenadas, consideramos que la ruta está disponible
          if (data.origen_latitud && data.destino_latitud) {
            this.rutaTrazada = true;
          }
        },
        (err) => {
          console.error('Error obtener ruta por id', err);
        }
      );
    }
  }

  // Métodos para mostrar textos de selección
  getUsuarioDisplay(): string {
    return this.usuarioSeleccionado?.nombre || 'Seleccione un usuario';
  }

  getTipoVehiculoDisplay(): string {
    return this.tipoVehiculoSeleccionado?.nombre_vehiculo || 'Seleccione un tipo de vehículo';
  }
}
