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
import { FuseSampleModule } from './main/content/AutenticationComponents/sample/sample.module';
import { LoginModule } from './main/content/AutenticationComponents/login/login.module';
import { RegisterModule } from './main/content/AutenticationComponents/register/register.module';
import { UserService } from './ApiServices/UserService';
import { ParameterService } from './ApiServices/ParametersServices';
import { ImageService } from './ApiServices/ImageServices';
import { HeaderBuilder } from './Tools/HeaderBuilder';
import { NavigationInfoService } from './ApiServices/NavigationInfoService';
import { ReunionService } from './ApiServices/ReunionService';
import { AdminServices } from './ApiServices/AdminServices';
import { UserInfoModule } from 'app/main/content/AutenticationComponents/UserInfo/UserInfo.module';

import { Individuo1Module } from 'app/main/content/DirectorDepartamentosComponents/Individuo1/individuo-1.module';
import { MainPageDirectorModule } from './main/content/DirectorDepartamentosComponents/MainPageDirector/MainPageDirector.module';
import { IndividuoServices } from 'app/ApiServices/IndividuoServices';
import { ClientGuard } from 'app/Guards/ClientGuard';
import { AdminGuard } from 'app/Guards/AdminGuard';
import { AltaGerenciaGuard } from './Guards/AltaGerencia';
import { GoldenLayoutModule } from '@embedded-enterprises/ng6-golden-layout';
import * as $ from 'jquery';
import { CommunicationService } from './ApiServices/CommunicationService';
import { LayoutMercadoModule } from './main/content/MercadoModule/LayoutMercado/LayoutMercado.module';
import { GridMercadoModule } from './main/content/MercadoModule/GridMercado/GridMercado.module';
import { appRoutes } from './appRoutes';

// It is required to have JQuery as global in the window object.
window['$'] = $;


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
        FuseSampleModule,
        LoginModule,
        RegisterModule,
        UserInfoModule,
        Individuo1Module,
        MainPageDirectorModule,
        LayoutMercadoModule,
        GridMercadoModule,   

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
        , AltaGerenciaGuard
        , CommunicationService]
    ,
    bootstrap: [
        AppComponent
    ], entryComponents: [

    ]

})
export class AppModule {
}
