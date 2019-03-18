import { Routes } from '@angular/router';
export const appRoutes: Routes = [
    //Autenticacion
    { path: 'LayoutMercado', redirectTo: '/LayoutMercado', pathMatch: 'full' },
    { path: 'Participantes', redirectTo: '/Participantes', pathMatch: 'full' },
    { path: 'register', redirectTo: '/register' },
    { path: 'cambiarClave', redirectTo: '/cambiarClave' },
    { path: 'error-404', redirectTo: '/error-404' },
    //AltaGerencia
    { path: 'mainpagealtagerencia', redirectTo: '/mainpagealtagerencia', pathMatch: 'full' },
    { path: 'reporteactividades', redirectTo: '/reporteactividades', pathMatch: 'full' },
    { path: 'ReporteIndividuo2', redirectTo: '/ReporteIndividuo2', pathMatch: 'full' },
    { path: 'ReporteMetasAlta', redirectTo: '/ReporteMetasAlta', pathMatch: 'full' },
    //Escrutinio
    { path: 'MainEscrutinioComponent', redirectTo: '/MainEscrutinioComponent', pathMatch: 'full' },
    { path: 'impugnacion', redirectTo: '/impugnacion', pathMatch: 'full' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
];
