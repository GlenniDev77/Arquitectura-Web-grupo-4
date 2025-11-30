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
import { Notificacion } from './components/notificacion/notificacion';
import { Notificacioninsertar } from './components/notificacion/notificacioninsertar/notificacioninsertar';
import { Resenia } from './components/resenia/resenia';
import { Reseniainsertar } from './components/resenia/reseniainsertar/reseniainsertar';
import { Ruta } from './components/ruta/ruta';
import { Rutainsertar } from './components/ruta/rutainsertar/rutainsertar';
import { Autenticador } from './components/autenticador/autenticador';
import { securityGuard } from './guard/security-guard';
import { Home } from './components/home/home';
import { ReporteDelitoPorZyD } from './components/reporte-delito-por-zy-d/reporte-delito-por-zy-d';
import { ReporteDelitoPorHyZ } from './components/reporte-delito-por-hy-z/reporte-delito-por-hy-z';
import { Mapa } from './components/mapa/mapa';
import { ReporteMasNotisPorUsuario } from './components/reporte-mas-notis-por-usuario/reporte-mas-notis-por-usuario';
import { ReporteMasNotisPorZona } from './components/reporte-mas-notis-por-zona/reporte-mas-notis-por-zona';
import { ReporteRutasPorTvehiculo } from './components/reporte-rutas-por-tvehiculo/reporte-rutas-por-tvehiculo';
import { ReporteDelitosPorMes } from './components/reporte-delitos-por-mes/reporte-delitos-por-mes';
import { ReporteUsuarioReportes } from './components/reporte-usuario-reportes/reporte-usuario-reportes';
import { ReporteUsuariosActivos } from './components/reporte-usuarios-activos/reporte-usuarios-activos';
import { Landing } from './components/landing/landing';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: Landing, // Tu componente de landing page
  },
  {
    path: 'login',
    component: Autenticador,
  },

  //{ path: '', redirectTo: '/menu', pathMatch: 'full' },
  //{ path: 'menu', component: Menu },
  {
    path: 'tipovehiculos',
    component: TipoVehiculo,
    children: [
      { path: 'nuevo', component: TipoVehiculoRegistrar },
      { path: 'edits/:id', component: TipoVehiculoRegistrar },
    ],
    canActivate: [securityGuard],
  },

  {
    path: 'zonas',
    component: Zona,
    children: [
      { path: 'nuevo', component: Zonaregistrar },
      { path: 'edits/:id', component: Zonaregistrar },
    ],
    canActivate: [securityGuard],
  },

  {
    path: 'roles',
    component: Rol,
    children: [
      { path: 'nuevo', component: RolInsertar },
      { path: 'edits/:id', component: RolInsertar },
    ],
    canActivate: [securityGuard],
  },

  {
    path: 'usuarios',
    component: Usuario,
    children: [
      { path: 'nuevo', component: UsuarioInsertar },
      { path: 'edits/:id', component: UsuarioInsertar },
    ],
    canActivate: [securityGuard],
  },

  {
    path: 'delitos',
    component: Delito,
    children: [
      { path: 'nuevo', component: DelitoInsertar },
      { path: 'edits/:id', component: DelitoInsertar },
    ],
    canActivate: [securityGuard],
  },

  {
    path: 'notificaciones',
    component: Notificacion,
    children: [
      { path: 'nuevo', component: Notificacioninsertar },
      { path: 'edits/:id', component: Notificacioninsertar },
    ],
    canActivate: [securityGuard],
  },

  {
    path: 'resenias',
    component: Resenia,
    children: [
      { path: 'nuevo', component: Reseniainsertar },
      { path: 'edits/:id', component: Reseniainsertar },
    ],
    canActivate: [securityGuard],
  },

  {
    path: 'rutas',
    component: Ruta,
    children: [
      { path: 'nuevo', component: Rutainsertar },
      { path: 'edits/:id', component: Rutainsertar },
    ],
    canActivate: [securityGuard],
  },

  {
    path: 'homes',
    component: Home,
    canActivate: [securityGuard],
  },

  {
    path: 'delitosPorZyD',
    component: ReporteDelitoPorZyD,
    canActivate: [securityGuard],
  },

  {
    path: 'delitosPorHyZ',
    component: ReporteDelitoPorHyZ,
    canActivate: [securityGuard],
  },

  {
    path: 'masNotificacionesPorUsuario',
    component: ReporteMasNotisPorUsuario,
    canActivate: [securityGuard],
  },

  {
    path: 'masNotificacionesPorZona',
    component: ReporteMasNotisPorZona,
    canActivate: [securityGuard],
  },
  {
    path: 'cantidadRutasPorTVehiculo',
    component: ReporteRutasPorTvehiculo,
    canActivate: [securityGuard],
  },
  {
    path: 'cantidadDelitosPorMes',
    component: ReporteDelitosPorMes,
    canActivate: [securityGuard],
  },
  {
    path: 'reporUsuarioMasReportes',
    component: ReporteUsuarioReportes,
  },
  {
    path: 'reporUsuariosActivos',
    component: ReporteUsuariosActivos,
  },
];
