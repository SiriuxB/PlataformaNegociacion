import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/AutenticationComponents/sample/sample.module';
import { LoginModule } from './main/content/AutenticationComponents/login/login.module';
import { RegisterModule } from './main/content/AutenticationComponents/register/register.module';
import { UserService } from './ApiServices/UserService';
import { ParameterService } from './ApiServices/ParametersServices';
import { ImageService } from './ApiServices/ImageServices';
import { HeaderBuilder } from './Tools/HeaderBuilder';
import { MapsGraphicModule } from './main/content/ClienteComponents/Mapas/MapsGraphic.module';
import { EventCreatorModule } from './main/content/ClienteComponents/CreadorEventos/EventCreator.module';
import { NavigationInfoService } from './ApiServices/NavigationInfoService';
import { VisorEventModule } from './main/content/ClienteComponents/VisorEventos/VisorEvent.module';
import { ReunionService } from './ApiServices/ReunionService';
import { DetailEventModule } from './main/content/ClienteComponents/DetailEvent/DetailEvent.module';
import { TipoEventoModule } from './main/content/AdminComponents/TipoEvento/tipo-evento.module';
import { AdminServices } from './ApiServices/AdminServices';
import { AceptImageModule } from './main/content/AdminComponents/AceptarImagenes/AceptImage.module';
import { MainPageAdminModule } from './main/content/AdminComponents/MainPageAdmin/MainPageAdmin.module'
import { ParamSectoresModule } from './main/content/AdminComponents/ParamSectores/ParamSectores.module';
import { UserInfoModule } from 'app/main/content/AutenticationComponents/UserInfo/UserInfo.module';
import { SectorModule } from './main/content/AdminComponents/Sector/sector.module';
import { SacIndividuo2Module } from './main/content/AdminComponents/sac-individuo2/sac-individuo2.module';
import { AdminIndividuo2Module } from './main/content/AdminComponents/sac-individuo2/admin-individuo2/admin-individuo2.module';

import { ZonaElectoralModule } from './main/content/AdminComponents/ZonaElectoral/zona-electoral.module';
import { Individuo1Module } from 'app/main/content/DirectorDepartamentosComponents/Individuo1/individuo-1.module';
import { MainPageDirectorModule } from './main/content/DirectorDepartamentosComponents/MainPageDirector/MainPageDirector.module';
import { MainPageIndividuo1Module } from './main/content/Individuo1Components/MainPageIndividuo1/MainPageIndividuo1.module';
import { Individuo2Module } from './main/content/Individuo1Components/Individuo2/individuo-2.module';
import { CambiarClaveModule } from './main/content/AutenticationComponents/cambiar-clave/cambiar-clave.module';
import { MesaModule } from './main/content/AdminComponents/Mesa/mesa.module';
import { GerenteSectorModule } from './main/content/AdminComponents/GerenteSector/gerente-sector.module';
import { PuestoVotacionModule } from 'app/main/content/AdminComponents/PuestoVotacion/puesto-votacion.module';
import { DirectorDepartamentoModule } from 'app/main/content/GerenteSectorComponents/DirectorDepartamento/director-departamento.module';
import { MainGerenteModule } from './main/content/GerenteSectorComponents/MainGerente/MainGerente.module';
import { IndividuoServices } from 'app/ApiServices/IndividuoServices';
import { TotalesModule } from 'app/main/content/ClienteComponents/totales/totales.module';
import { CorreoModule } from 'app/main/content/AdminComponents/correo/correo.module';
import { ListarVehiculosxDirModule } from './main/content/listar-vehiculosx-dir/listar-vehiculosx-dir.module';
import { CarrouselModule } from './main/content/ClienteComponents/Mapas/Carrousel/Carrousel.module';
import { Error404Module } from './main/content/AutenticationComponents/404/error-404.module';
import { ClientGuard } from 'app/Guards/ClientGuard';
import { AdminGuard } from 'app/Guards/AdminGuard';
import { MetasModule } from './main/content/GerenteSectorComponents/Metas/metas.module';
import { MetasDetalleModule } from './main/content/DirectorDepartamentosComponents/MetasDetalle/metas-detalle.module';
import { ReporteMetasModule } from './main/content/ReporteComponents/ReporteMetas/ReporteMetas.module';
import { MainPageAltaGerenciaModule } from './main/content/AltaGerenciaComponents/MainPageAltaGerencia/MainPageAltaGerencia.module';
import { AltaGerenciaGuard } from './Guards/AltaGerencia';
import { ListTipoEventoModule } from 'app/main/content/AdminComponents/TipoEvento/list-tipo-evento/list-tipo-evento.module';
import { ListSectorModule } from 'app/main/content/AdminComponents/Sector/list-sector/list-sector.module';
import { ListarDirectoresModule } from 'app/main/content/GerenteSectorComponents/DirectorDepartamento/listar-directores/listar-directores.module';
import { ListaZonaElectoModule } from 'app/main/content/AdminComponents/ZonaElectoral/lista-zona-electo/lista-zona-electo.module';
import { ListarPuestosVotacionModule } from 'app/main/content/AdminComponents/PuestoVotacion/listar-puestos-votacion/listar-puestos-votacion.module';
import { ListarMesasModule } from 'app/main/content/AdminComponents/Mesa/listar-mesas/listar-mesas.module';
import { ListarGerenteModule } from 'app/main/content/AdminComponents/GerenteSector/listar-gerente/listar-gerente.module';
import { ListarMetasGerModule } from 'app/main/content/GerenteSectorComponents/listar-metas-ger/listar-metas-ger.module';
import { ListarMetasModule } from 'app/main/content/DirectorDepartamentosComponents/listar-metasDir/listar-metas.module';
import { Individuo2DirModule } from 'app/main/content/DirectorDepartamentosComponents/Individuo2Dir/Individuo2Dir.module';
import { ReporteActividadesModule } from 'app/main/content/AltaGerenciaComponents/ReporteActividades/ReporteActividades.module';
import { ReporteIndividuo2Module } from './main/content/AltaGerenciaComponents/ReporteIndividuo2/ReporteIndividuo2.module';
import { ReporteIndividuo2FromGerenteModule } from 'app/main/content/GerenteSectorComponents/ReporteIndividuo2FromGerente/ReporteIndividuo2FromGerente.module';
import { ReporteIndividuo2FromDirectorModule } from 'app/main/content/DirectorDepartamentosComponents/ReporteIndividuo2FromDirector/ReporteIndividuo2FromDirector.module';
import { ReporteMetasAltaModule } from './main/content/AltaGerenciaComponents/ReporteMetasAlta/ReporteMetasAlta.module';
import { MainTransportadorCarroModule } from './main/content/TransportadorCarroComponents/MainTransportadorCarro/MainTransportadorCarro.module';
import { MetasCallModule } from './main/content/AdminComponents/metas-call/metas-call.module';
import { LlamadasModule } from './main/content/AdminComponents/llamadas/llamadas.module';
import { ListMetasCallModule } from './main/content/AdminComponents/metas-call/list-metas-call/list-metas-call.module';
import { ListarLlamadasModule } from './main/content/AdminComponents/llamadas/listar-llamadas/listar-llamadas.module';
import { VehiculoModule } from './main/content/TransportadorCarroComponents/Vehiculo/vehiculo.module';
import { ReporteMetasEstructuraModule } from 'app/main/content/AltaGerenciaComponents/ReporteMetasEstructura/ReporteMetasEstructura.module';
import { ImpugnacionModule } from 'app/main/content/EscrutinioComponents/Impugnacion/impugnacion.module';
import { MainEscrutinioModule } from 'app/main/content/EscrutinioComponents/MainEscrutinio/MainEscrutinio.module';


const appRoutes: Routes = [
    //Autenticacion
    { path: 'sample', redirectTo: '/sample', pathMatch: 'full' },
    { path: 'register', redirectTo: '/register' },
    { path: 'cambiarClave', redirectTo: '/cambiarClave' },
    { path: 'error-404', redirectTo: '/error-404' },
    //Cliente
    { path: 'Maps', redirectTo: '/Maps', pathMatch: 'full' },
    { path: 'eventcreator', redirectTo: '/eventcreator', pathMatch: 'full' },
    { path: 'eventvisor', redirectTo: '/eventvisor', pathMatch: 'full' },
    { path: 'tipoevento', redirectTo: '/tipoevento', pathMatch: 'full' },
    { path: 'detailevent', redirectTo: '/detailevent', pathMatch: 'full' },
    { path: 'aceptimage', redirectTo: '/aceptimage', pathMatch: 'full' },
    { path: 'totales', redirectTo: '/totales', pathMatch: 'full' },
    { path: 'ListarMetas', redirectTo: '/ListarMetas', pathMatch: 'full' },
    { path: 'Carrousel', redirectTo: '/Carrousel', pathMatch: 'full' },
    { path: 'correo', redirectTo: '/correo', pathMatch: 'full' },
    //Admin
    { path: 'mainpageadmin', redirectTo: '/mainpageadmin', pathMatch: 'full' },
    { path: 'sector', redirectTo: '/sector', pathMatch: 'full' },
    { path: 'SacIndividuo2', redirectTo: '/SacIndividuo2', pathMatch: 'full' },
    { path: 'AdminIndividuo2', redirectTo: '/AdminIndividuo2', pathMatch: 'full' },
    { path: 'zonaelectoral', redirectTo: '/zonaelectoral', pathMatch: 'full' },
    { path: 'puestovotacion', redirectTo: '/puestovotacion', pathMatch: 'full' },
    { path: 'mesa', redirectTo: '/mesa', pathMatch: 'full' },
    { path: 'gerentesector', redirectTo: '/gerentesector', pathMatch: 'full' },
    { path: 'ListarVehiculosxDir', redirectTo: '/ListarVehiculosxDir', pathMatch: 'full' },
    { path: 'listarTipoEvento', redirectTo: '/listarTipoEvento', pathMatch: 'full' },
    { path: 'listarSector', redirectTo: '/listarSector', pathMatch: 'full' },
    { path: 'listarZonaElec', redirectTo: '/listarZonaElec', pathMatch: 'full' },
    { path: 'listarPuestos', redirectTo: '/listarPuestos', pathMatch: 'full' },
    { path: 'listarMesas', redirectTo: '/listarMesas', pathMatch: 'full' },
    { path: 'lsitarGerente', redirectTo: '/lsitarGerente', pathMatch: 'full' },
    { path: 'MetasCall', redirectTo: '/MetasCall', pathMatch: 'full' },
    { path: 'Llamadas', redirectTo: '/Llamadas', pathMatch: 'full' },
    { path: 'ListarMetasCall', redirectTo: '/ListarMetasCall', pathMatch: 'full' },
    { path: 'ListarLlamadas', redirectTo: '/ListarLlamadas', pathMatch: 'full' },
    { path: 'ReporteMetasEstructura', redirectTo: '/ReporteMetasEstructura', pathMatch: 'full' },

    //Gerente
    { path: 'maingerente', redirectTo: '/maingerente', pathMatch: 'full' },
    { path: 'directordepartamento', redirectTo: '/directordepartamento', pathMatch: 'full' },
    { path: 'ListarMetasGer', redirectTo: '/ListarMetasGer', pathMatch: 'full' },
    { path: 'metas', redirectTo: '/metas', pathMatch: 'full' },
    { path: 'ListarDirector', redirectTo: '/ListarDirector', pathMatch: 'full' },
    { path: 'ReporteIndividuo2FromGerente', redirectTo: '/ReporteIndividuo2FromGerente', pathMatch: 'full' },

    //Director
    { path: 'mainpagedirector', redirectTo: '/mainpagedirector', pathMatch: 'full' },
    { path: 'individuo1', redirectTo: '/individuo1', pathMatch: 'full' },
    { path: 'metasdetalle', redirectTo: '/metasdetalle', pathMatch: 'full' },
    { path: 'ListarMetasdetalle', redirectTo: '/ListarMetasdetalle', pathMatch: 'full' },
    { path: 'Individuo2Dir', redirectTo: '/Individuo2Dir', pathMatch: 'full' },
    { path: 'ReporteIndividuo2FromDirector', redirectTo: '/ReporteIndividuo2FromDirector', pathMatch: 'full' },


    //Individuo 1
    { path: 'mainpageindividuo1', redirectTo: '/mainpageindividuo1', pathMatch: 'full' },
    { path: 'individuo2', redirectTo: '/individuo2', pathMatch: 'full' },
    //Reporte
    { path: 'ReporteMetas', redirectTo: '/ReporteMetas', pathMatch: 'full' },
    //Conductor
    { path: 'maintransportadorcarro', redirectTo: '/maintransportadorcarro', pathMatch: 'full' },
    { path: 'vehiculo', redirectTo: '/vehiculo', pathMatch: 'full' },

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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        ListTipoEventoModule,
        FuseSharedModule,
        FuseMainModule,
        FuseSampleModule,
        LoginModule,
        RegisterModule,
        MapsGraphicModule,
        EventCreatorModule,
        VisorEventModule,
        DetailEventModule,
        TipoEventoModule,
        AceptImageModule,
        SectorModule,
        MainPageAdminModule,
        UserInfoModule,
        DirectorDepartamentoModule,
        Individuo2Module,
        ZonaElectoralModule,
        Individuo1Module,
        MainPageDirectorModule,
        MainPageIndividuo1Module,
        CambiarClaveModule,
        PuestoVotacionModule,
        MesaModule,
        GerenteSectorModule,
        SacIndividuo2Module,
        AdminIndividuo2Module,
        TotalesModule,
        MainGerenteModule,
        ListarMetasModule,
        MetasDetalleModule,
        ListarMetasGerModule,
        ListarVehiculosxDirModule,
        CarrouselModule,
        CorreoModule,
        MetasModule,
        Error404Module,
        ReporteMetasModule,
        ListSectorModule,
        ListarDirectoresModule,
        ListaZonaElectoModule,
        ListarPuestosVotacionModule,
        ListarMesasModule,
        ListarGerenteModule,
        MainPageAltaGerenciaModule,
        Individuo2DirModule,
        ReporteActividadesModule,
        ReporteIndividuo2Module,
        ReporteIndividuo2FromGerenteModule,
        ReporteIndividuo2FromDirectorModule,
        ReporteMetasAltaModule,
        MainTransportadorCarroModule,
        MetasCallModule,
        LlamadasModule,
        ListMetasCallModule,
        ListarLlamadasModule,
        VehiculoModule,
        ReporteMetasEstructuraModule,
        ImpugnacionModule,
        MainEscrutinioModule

    ],
    providers: [
        UserService
        , ParameterService
        , ImageService
        , HeaderBuilder
        , NavigationInfoService
        , ReunionService
        , AdminServices
        , IndividuoServices
        , ClientGuard
        , AdminGuard
        , AltaGerenciaGuard]
    ,
    bootstrap: [
        AppComponent
    ], entryComponents: [

    ]

})
export class AppModule {
}
