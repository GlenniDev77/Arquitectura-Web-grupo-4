import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Notificacion } from '../../../models/Notificacion';
import { Usuario } from '../../../models/Usuario';
import { Zona } from '../../../models/Zona';
import { Notificacionservice } from '../../../services/notificacionservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Zonaservice } from '../../../services/zonaservice';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-notificacioninsertar',
  imports: [
    MatSelectModule,MatOptionModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule],
  templateUrl: './notificacioninsertar.html',
  styleUrl: './notificacioninsertar.css',
})
export class Notificacioninsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  
  edicion: boolean = false;
  id: number = 0;
  sof: Notificacion = new Notificacion();

  listaUsuarios:Usuario[]=[]

  listaZonas:Zona[]=[]

  constructor(
    private sS: Notificacionservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS:Usuarioservice,
    private zS:Zonaservice
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })

    this.zS.list().subscribe(data=>{
      this.listaZonas=data
    })


    this.form = this.formBuilder.group({
      codigo: [''],
      mensaje: ['', Validators.required],
      FK: ['', Validators.required],
      FK2: ['', Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {

      this.sof.id_notificacion = this.form.value.codigo;
      this.sof.mensaje = this.form.value.mensaje;
      this.sof.usuario.id_usuario = this.form.value.FK;
      this.sof.zona.idZona = this.form.value.FK2;

      if (this.edicion) {
        this.sS.update(this.sof).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
        this.sS.insert(this.sof).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['notificaciones']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {

        this.form = new FormGroup({
          codigo: new FormControl(data.id_notificacion),
          desc: new FormControl(data.mensaje),
          FK: new FormControl(data.usuario.nombre),
          FK2: new FormControl(data.zona.nombre)
        });
      });
    }
  }  
}

