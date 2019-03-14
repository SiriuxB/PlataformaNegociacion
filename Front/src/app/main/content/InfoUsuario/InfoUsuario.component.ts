import { Component, OnInit } from '@angular/core';
import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';
import { licence_ag } from 'app/Tools/licence.agGrid';
import { UserAutentication } from 'app/models/UserAutentication';
import { LoginService } from 'app/ApiServices/login.service';

@Component({
    moduleId: module.id,
    selector: 'InfoUsuario',
    templateUrl: 'InfoUsuario.component.html',
    styleUrls: ['InfoUsuario.component.scss']
})
export class InfoUsuarioComponent implements OnInit {
    UserAutentication: UserAutentication = new UserAutentication();
    // Horizontal Stepper
    public gridOptions: GridOptions = {};
    gridApi: any;
    constructor(private LoginService: LoginService
    ) { }

    ngOnInit() {
        this.UserAutentication = this.LoginService.getLoginSession()

    }
    onGridReady(params) {
        this.gridApi = params.api;
    }

    ReturnPage(event: Event) {
        event.preventDefault();
    }



}

