import { Routes } from '@angular/router';
import { TipoVehiculo } from './components/tipo-vehiculo/tipo-vehiculo';
import { Menu } from './components/menu/menu';
import { Zona } from './components/zona/zona';
import { TipoVehiculoRegistrar } from './components/tipo-vehiculo/tipo-vehiculo-registrar/tipo-vehiculo-registrar';

export const routes: Routes = [
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: 'menu', component: Menu },
    { path:'tipovehiculos',component:TipoVehiculo,
        children:[
            {path:'nuevo',component:TipoVehiculoRegistrar},
            {path:'edits/:id',component:TipoVehiculoRegistrar}
        ]
    },
    { path:'zonas',component:Zona}
];
