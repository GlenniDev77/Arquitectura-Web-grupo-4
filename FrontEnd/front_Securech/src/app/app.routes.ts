import { Routes } from '@angular/router';
import { Zona } from './components/zona/zona';
import { Tipovehiculo } from './components/tipovehiculo/tipovehiculo';
import { InsertarVehiculo } from './components/tipovehiculo/insertar-vehiculo/insertar-vehiculo';

export const routes: Routes = [
    {path:'tipovehiculo',component:Tipovehiculo,
        children:[
            {path:'nuevo',component:InsertarVehiculo},
            //{path:'edits/:id',component:InsertarVehiculo}
        ]
    },
    {path:'zona',component:Zona,
        children:[
            //{path:'nuevo',component:vehiculoinsertar},
            //{path:'edits/:id',component:vehiculoinsertar}
        ]
    }
];
