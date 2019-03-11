import { Component, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation, navigationAdmin, navigationDirectorDepartamento, navigationIndividuo1, navigatioGerenteSector, navigationAltaGerencia, navigationTransportador, navigationEscrutinio } from 'app/navigation/navigation';
import { navigationClient } from 'app/navigation/navigation';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { AppSettings } from '../../app.settings';
import { Router } from '@angular/router';
import { Perfiles } from '../../Enums/Enumerations';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { LoginService } from 'app/ApiServices/login.service';

@Component({
    selector: 'fuse-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavbarComponent implements OnDestroy {
    private fusePerfectScrollbar: FusePerfectScrollbarDirective;

    @ViewChild(FusePerfectScrollbarDirective) set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this.fusePerfectScrollbar = theDirective;

        this.navigationServiceWatcher =
            this.navigationService.onItemCollapseToggled.subscribe(() => {
                this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.fusePerfectScrollbar.update();
                }, 310);
            });
    }

    @Input() layout;
    navigation: any;
    navigationServiceWatcher: Subscription;
    fusePerfectScrollbarUpdateTimeout;
    userService: any
    constructor(
        private sidebarService: FuseSidebarService,
        private navigationService: FuseNavigationService,
        private route: Router,
        private LoginService: LoginService,
        private CommunicationService: CommunicationService
    ) {
        // Navigation data
        //   if (AppSettings.Global().TipoAplicacion == 1) 
        this.navigation = navigationAdmin;
        if (this.LoginService.getLoginSession() == null) {
            this.navigation = navigationAdmin;
        }
        else {
            if (this.LoginService.getLoginSession().Roll == 1) {
                this.navigation = navigationClient;
            } else if (this.LoginService.getLoginSession().Roll  == 2) {
                this.navigation = navigationAdmin;
            }
            else if (this.LoginService.getLoginSession().Roll  == 3) {
                this.navigation = navigationDirectorDepartamento;
            }
            else if (this.LoginService.getLoginSession().Roll  == 4) {
                this.navigation = navigationIndividuo1;
            }
            else if (this.LoginService.getLoginSession().Roll  == 7) {
                this.navigation = navigatioGerenteSector;
            }
            else if (this.LoginService.getLoginSession().Roll  == Perfiles.AltaGerencia) {
                this.navigation = navigationAltaGerencia
            }
            else if (this.LoginService.getLoginSession().Roll  == Perfiles.TransportadorCarro) {
                this.navigation = navigationTransportador
            }
            else if (this.LoginService.getLoginSession().Roll  == Perfiles.Escrutinio) {
                this.navigation = navigationEscrutinio
            }



        }



        // Default layout
        this.layout = 'vertical';
    }

    ngOnDestroy() {
        if (this.fusePerfectScrollbarUpdateTimeout) {
            clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
        }

        if (this.navigationServiceWatcher) {
            this.navigationServiceWatcher.unsubscribe();
        }
    }



    toggleSidebarOpened(key) {

        this.sidebarService.getSidebar(key).toggleOpen();
        this.CommunicationService.changeSizeWindow();
    }

    toggleSidebarFolded(key) {

        this.sidebarService.getSidebar(key).toggleFold();
        this.CommunicationService.changeSizeWindow();
    }
}
