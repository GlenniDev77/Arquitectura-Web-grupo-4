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
    MatIconModule],
  templateUrl: './usuario-insertar.html',
  styleUrl: './usuario-insertar.css',
})
export class UsuarioInsertar implements OnInit{
  form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  sof: Usuario = new Usuario();

  

  constructor(
    private sS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });



    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      contra: ['', Validators.required],
      telef: ['', Validators.required],
      fecha: [false, Validators.required],
      estado: ['', Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.sof.id_usuario = this.form.value.codigo;
      this.sof.nombre = this.form.value.nombre;
      this.sof.correo = this.form.value.correo;
      this.sof.contraseña = this.form.value.contra;
      this.sof.telefono = this.form.value.telef;
      this.sof.fecha = this.form.value.fecha;
      this.sof.enabled = this.form.value.estado;
      

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
      this.router.navigate(['usuarios']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id_usuario),
          nombre: new FormControl(data.nombre),
          correo: new FormControl(data.correo),
          contra: new FormControl(data.contraseña),
          telef: new FormControl(data.telefono),
          fecha: new FormControl(data.fecha),
          estado: new FormControl(data.enabled)
        });
      });
    }
  }
}
