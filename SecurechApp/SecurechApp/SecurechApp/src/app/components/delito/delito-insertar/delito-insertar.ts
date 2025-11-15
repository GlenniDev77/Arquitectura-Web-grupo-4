import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Delito } from '../../../models/Delito';
import { Zona } from '../../../models/Zona';
import { Delitoservice } from '../../../services/delitoservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Zonaservice } from '../../../services/zonaservice';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-delito-insertar',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule],
  templateUrl: './delito-insertar.html',
  styleUrl: './delito-insertar.css',
})
export class DelitoInsertar implements OnInit{
  form: FormGroup = new FormGroup({});

  edicion: boolean = false;
  id: number = 0;
  sof: Delito = new Delito();

  listaUsuarios:Usuario[]=[]

  listaZonas:Zona[]=[]
  

  tiposDelito: { value: string; viewValue: string }[] = [
    { value: 'Hurto', viewValue: 'Hurto' },
    { value: 'Asesinato', viewValue: 'Asesinato' },
    { value: 'Acoso Sexual', viewValue: 'Acoso Sexual' },
  ];

  constructor(
    private sS: Delitoservice,
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

    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');      // hora local
    const minutos = ahora.getMinutes().toString().padStart(2, '0');  // minutos locales
    const horaActual = `${horas}:${minutos}`;                        // "HH:mm"


    this.form = this.formBuilder.group({
      codigo: [''],
      tipo: ['', Validators.required],
      desc: ['', Validators.required],
      fecha: [ahora, Validators.required],
      hora: [horaActual, Validators.required],
      nombre: ['', Validators.required],
      FK: [false, Validators.required],
      FK2: ['', Validators.required]
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      
      const fechaObj: Date = this.form.value.fecha;  // Date de Angular
      const fecha = fechaObj.toISOString().split("T")[0];  // "2025-11-13"

      const hora: string = this.form.value.hora;     // "11:11"

      const fechaHoraISO = `${fecha}T${hora}:00`;    // "2025-11-13T11:11:00"

      this.sof.id_reportedelito = this.form.value.codigo;
      this.sof.tipo_delito = this.form.value.tipo;
      this.sof.descripcion = this.form.value.desc;
      this.sof.fecha_hora = fechaHoraISO;
      this.sof.nombre = this.form.value.nombre;
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
      this.router.navigate(['delitos']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {

        const fechaHora = data.fecha_hora; // ejemplo: "2025-11-13T22:03:00"
        const [fecha, horaCompleta] = fechaHora.split("T");
        const hora = horaCompleta.substring(0, 5); // "22:03"

        this.form = new FormGroup({
          codigo: new FormControl(data.id_reportedelito),
          tipo: new FormControl(data.tipo_delito),
          desc: new FormControl(data.descripcion),
          fecha: new FormControl(fecha),   // yyyy-MM-dd
          hora: new FormControl(hora),   
          nombre: new FormControl(data.nombre),
          FK: new FormControl(data.usuario.id_usuario),
          FK2: new FormControl(data.zona.idZona)
        });
      });
    }
  }  

}
