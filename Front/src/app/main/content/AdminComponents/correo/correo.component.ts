import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';

@Component({
    moduleId: module.id,
    selector: 'correo',
    templateUrl: 'correo.component.html',
    styleUrls: ['correo.component.scss']
})
export class CorreoComponent {
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private Router: Router, private UserService: UserService
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });
    }
}
