import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { LoginModule } from './main/content/AutenticationComponents/login/login.module';
import { HeaderBuilder } from './Tools/HeaderBuilder';
import { NavigationInfoService } from './ApiServices/NavigationInfoService';
import { ClientGuard } from 'app/Guards/ClientGuard';
import { AdminGuard } from 'app/Guards/AdminGuard';
import { AltaGerenciaGuard } from './Guards/AltaGerencia';
import { GoldenLayoutModule } from '@embedded-enterprises/ng6-golden-layout';
import * as $ from 'jquery';
import { CommunicationService } from './ApiServices/CommunicationService';
import { LayoutMercadoModule } from './main/content/MercadoModule/LayoutMercado/LayoutMercado.module';
import { GridMercadoModule } from './main/content/MercadoModule/GridMercado/GridMercado.module';
import { appRoutes } from './appRoutes';
import { RealtimeService, SignalrWindow } from './ApiServices/realtime.service';
import { LoginService } from './ApiServices/login.service';
import { BuildHeaderService } from './ApiServices/BuildHeader';
import { CompraVentaModule } from './main/content/MercadoModule/CompraVenta/CompraVenta.module';
import { InfoUsuarioModule } from './main/content/InfoUsuario/InfoUsuario.module';




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
        GoldenLayoutModule,
        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        LoginModule,
        LayoutMercadoModule,
        GridMercadoModule,
        CompraVentaModule,
        InfoUsuarioModule
    ],
    providers: [
        HeaderBuilder
        , NavigationInfoService
        , ClientGuard
        , AdminGuard
        , AltaGerenciaGuard
        , CommunicationService
        , RealtimeService
        , LoginService
        , BuildHeaderService
        , { provide: SignalrWindow, useValue: window }]
    ,
    bootstrap: [
        AppComponent
    ], entryComponents: [

    ]

})
export class AppModule {
}
