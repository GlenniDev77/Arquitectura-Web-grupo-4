import { Routes } from '@angular/router';
import { TipoVehiculo } from './components/tipo-vehiculo/tipo-vehiculo';
import { Menu } from './components/menu/menu';
import { Zona } from './components/zona/zona';
import { TipoVehiculoRegistrar } from './components/tipo-vehiculo/tipo-vehiculo-registrar/tipo-vehiculo-registrar';
import { Zonaregistrar } from './components/zona/zonaregistrar/zonaregistrar';
import { Rol } from './components/rol/rol';
import { RolInsertar } from './components/rol/rol-insertar/rol-insertar';
import { Usuario } from './components/usuario/usuario';
import { UsuarioInsertar } from './components/usuario/usuario-insertar/usuario-insertar';
import { Delito } from './components/delito/delito';
import { DelitoInsertar } from './components/delito/delito-insertar/delito-insertar';

export const routes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: 'menu', component: Menu },
    { path:'tipovehiculos',component:TipoVehiculo,
        children:[
            {path:'nuevo',component:TipoVehiculoRegistrar},
            {path:'edits/:id',component:TipoVehiculoRegistrar}
        ]
    },
    { path:'zonas',component:Zona,
        children:[
            {path:'nuevo',component:Zonaregistrar},
            {path:'edits/:id',component:Zonaregistrar}
        ]
    },
    { path:'roles',component:Rol,
        children:[
            {path:'nuevo',component:RolInsertar},
            {path:'edits/:id',component:RolInsertar}
        ]
    },
    { path:'usuarios',component:Usuario,
        children:[
            {path:'nuevo',component:UsuarioInsertar},
            {path:'edits/:id',component:UsuarioInsertar}
        ]
    },
    { path:'delitos',component:Delito,
        children:[
            {path:'nuevo',component:DelitoInsertar},
            {path:'edits/:id',component:DelitoInsertar}
        ]
    }
];
